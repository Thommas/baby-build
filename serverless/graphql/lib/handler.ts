/**
 * Path of child
 *
 * GraphQL - Handler
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { ApolloServer } from 'apollo-server-lambda';
import { typeDefs, resolvers } from './schema/schema';
import { verify } from 'jsonwebtoken';
import * as jwks from 'jwks-rsa';

declare var process: {
  env: {
    AUTH0_CLIENT_ID: string,
    AUTH0_JWKS_URI: string,
    AUTH0_JWKS_KID: string,
  }
}

/**
 * Returns an IAM policy document for a given user and resource.
 *
 * @method childIAMPolicy
 * @param {String} userId - user id
 * @param {String} effect  - Allow / Deny
 * @param {String} resource - resource ARN
 * @param {String} context - response context
 * @returns {Object} policyDocument
 */
const childIAMPolicy = (userId, effect, resource, context) => {
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
  console.log('PLOP');
  if (!event.authorizationToken) {
    console.log('PLOP1');
    return callback('Unauthorized')
  }

  const tokenParts = event.authorizationToken.split(' ')
  if (tokenParts.length !== 2) {
    console.log('PLOP2');
    return callback('Unauthorized')
  }

  const bearerValue = tokenParts[0]
  const tokenValue = tokenParts[1]
  if (!(bearerValue.toLowerCase() === 'bearer' && tokenValue)) {
    console.log('PLOP3');
    return callback('Unauthorized')
  }

  const options: any = {
    audience: process.env.AUTH0_CLIENT_ID,
    algorithms: ['RS256']
  }
  try {
    const jwksClient = jwks({
      strictSsl: true,
      cache: true,
      jwksUri: process.env.AUTH0_JWKS_URI
    });
    return jwksClient.getSigningKey(process.env.AUTH0_JWKS_KID, (err: any, key: any) => {
      const signingKey = key.publicKey || key.rsaPublicKey || '';
      verify(tokenValue, signingKey, options, (verifyError: any, decoded: any) => {
        if (verifyError) {
          console.log('verifyError', verifyError)
          console.log(`Token invalid. ${verifyError}`)
          return callback('Unauthorized')
        }
        const userId = decoded.sub
        const effect = 'Allow'
        const resource = event.methodArn
        const authorizerContext = { userId: `User-${userId}` }
        console.log('Valid userId', userId)
        return callback(null, childIAMPolicy(userId, effect, resource, authorizerContext))
      })
    })
  } catch (err) {
    console.log('catch error. Invalid token', err)
    return callback('Unauthorized')
  }
}

exports.graphql = (event, context, callback) => {
  const server = new ApolloServer({
    playground: true,
    introspection: true,
    typeDefs,
    resolvers,
    context: ({ event, context }) => ({
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
      userId: event.requestContext.authorizer.userId,
    }),
  });

  const handler = server.createHandler({
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  return handler(event, context, callback);
};
