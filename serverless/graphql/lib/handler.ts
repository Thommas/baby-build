/**
 * Path of build
 *
 * GraphQL - Handler
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { graphqlLambda } from 'graphql-server-lambda';
import schema from './schema/schema';
import { verify } from 'jsonwebtoken';
import * as jwks from 'jwks-rsa';

/**
 * Returns an IAM policy document for a given user and resource.
 *
 * @method buildIAMPolicy
 * @param {String} userId - user id
 * @param {String} effect  - Allow / Deny
 * @param {String} resource - resource ARN
 * @param {String} context - response context
 * @returns {Object} policyDocument
 */
const buildIAMPolicy = (userId, effect, resource, context) => {
  const policy = {
    principalId: userId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
    context,
  };

  return policy;
};

exports.auth = (event, context, callback) => {
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
    const jwksClient = jwks({
      strictSsl: true,
      cache: true,
      jwksUri: process.env.AUTH0_JWKS_URI
    });
    return jwksClient.getSigningKey(process.env.AUTH0_JWKS_KID, (err, key) => {
      const signingKey = key.publicKey || key.rsaPublicKey || '';
      verify(tokenValue, signingKey, options, (verifyError: any, decoded: any) => {
        if (verifyError) {
          console.log('verifyError', verifyError)
          console.log(`Token invalid. ${verifyError}`)
          return callback('Unauthorized')
        }
        console.log('valid from customAuthorizer', decoded)
        const userId = decoded.sub
        const effect = 'Allow'
        const resource = event.methodArn
        const authorizerContext = { user_id: userId }
        return callback(null, buildIAMPolicy(userId, effect, resource, authorizerContext))
      })
    })
  } catch (err) {
    console.log('catch error. Invalid token', err)
    return callback('Unauthorized')
  }
}

exports.graphql = (event, context, callback) => {
  console.log('userId', event.requestContext.authorizer.user_id);
  const graphQLContext = { user_id: event.requestContext.authorizer.user_id };

  const callbackFilter = (error, output) => {
    console.log('output', output)
    const outputWithHeader = Object.assign({}, output, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
    callback(error, outputWithHeader);
  };

  graphqlLambda({ schema, context: graphQLContext })(event, context, callbackFilter);
};
