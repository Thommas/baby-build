/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { verify } from 'jsonwebtoken';
import * as jwks from 'jwks-rsa';
import { configService } from './config.service';

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

class AuthService {
  authenticate(event, callback) {
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

    const options: any = {
      audience: configService.auth0ClientId,
      algorithms: ['RS256']
    }
    try {
      const jwksClient = jwks({
        strictSsl: true,
        cache: true,
        jwksUri: configService.auth0JwksUri
      });
      return jwksClient.getSigningKey(configService.auth0JwksKid, (err: any, key: any) => {
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
}

export const authService = new AuthService();
