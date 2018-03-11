/**
 * Path of child
 *
 * GraphQL - Handler
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { graphqlLambda } from 'graphql-server-lambda';
import schema from './schema/schema';
import { verify } from 'jsonwebtoken';
import * as jwks from 'jwks-rsa';

const jwksClient = jwks({
  strictSsl: true,
  jwksUri: process.env.AUTH0_JWKS_URI
});

const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {}
  authResponse.principalId = principalId
  if (effect && resource) {
    const policyDocument = {}
    policyDocument.Version = '2012-10-17'
    policyDocument.Statement = []
    const statementOne = {}
    statementOne.Action = 'execute-api:Invoke'
    statementOne.Effect = effect
    statementOne.Resource = resource
    policyDocument.Statement[0] = statementOne
    authResponse.policyDocument = policyDocument
  }
  return authResponse
}

exports.auth = (event, context, callback) => {
  console.log('event', event)
  if (!event.authorizationToken) {
    return callback('Unauthorized')
  }

  const tokenParts = event.authorizationToken.split(' ')
  if (tokenParts.length !== 2) {
    return callback('Unauthorized')
  }

  const bearerValue = tokenParts[0]
  const tokenValue = tokenParts[1]
  if (!(bearerValue.toLowerCase() === 'bearer' && tokenValue)) {
    return callback('Unauthorized')
  }

  const options = {
    audience: process.env.AUTH0_CLIENT_ID,
    algorithms: ['RS256']
  }
  try {
    return jwksClient.getSigningKey(process.env.AUTH0_JWKS_KID, (err, key) => {
      const signingKey = key.publicKey || key.rsaPublicKey;
      verify(tokenValue, signingKey, options, (verifyError, decoded) => {
        if (verifyError) {
          console.log('verifyError', verifyError)
          console.log(`Token invalid. ${verifyError}`)
          return callback('Unauthorized')
        }
        console.log('valid from customAuthorizer', decoded)
        return callback(null, generatePolicy(decoded.sub, 'Allow', event.methodArn))
      })
    })
  } catch (err) {
    console.log('catch error. Invalid token', err)
    return callback('Unauthorized')
  }
}

exports.graphql = (event, context, callback) => {
  const callbackFilter = (error, output) => {
    const outputWithHeader = Object.assign({}, output, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
    callback(error, outputWithHeader);
  };

  graphqlLambda({ schema })(event, context, callbackFilter);
};

exports.build = (event, context, callback) => {
  event.Records.forEach((record) => {
    console.log('Stream record: ', JSON.stringify(record, null, 2));
    if (record.eventName == 'INSERT') {
      // var who = JSON.stringify(record.dynamodb.NewImage.Username.S);
      // var when = JSON.stringify(record.dynamodb.NewImage.Timestamp.S);
    }
  });
  callback(null, `Successfully processed ${event.Records.length} records.`);
};
