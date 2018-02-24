/**
 * Path of child
 *
 * GraphQL - Handler
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { graphqlLambda } from 'graphql-server-lambda';
import schema from './schema/schema';
import jwt from 'jsonwebtoken';

const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET

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

// Reusable Authorizer function, set on `authorizer` field in serverless.yml
exports.auth = (event, context, callback) => {
  console.log('event', event)
  if (!event.authorizationToken) {
    return callback('Unauthorized')
  }

  const tokenParts = event.authorizationToken.split(' ')
  const tokenValue = tokenParts[1]

  if (!(tokenParts[0].toLowerCase() === 'bearer' && tokenValue)) {
    // no auth token!
    return callback('Unauthorized')
  }
  const options = {
    audience: AUTH0_CLIENT_ID,
  }
  // decode base64 secret. ref: http://bit.ly/2hA6CrO
  const secret = new Buffer.from(AUTH0_CLIENT_SECRET, 'base64')
  try {
    jwt.verify(tokenValue, secret, options, (verifyError, decoded) => {
      if (verifyError) {
        console.log('verifyError', verifyError)
        // 401 Unauthorized
        console.log(`Token invalid. ${verifyError}`)
        return callback('Unauthorized')
      }
      // is custom authorizer function
      console.log('valid from customAuthorizer', decoded)
      return callback(null, generatePolicy(decoded.sub, 'Allow', event.methodArn))
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
