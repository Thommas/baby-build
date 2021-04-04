/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { verify } from 'jsonwebtoken';
import jwks from 'jwks-rsa';
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
  authenticateToken(event: any, callback: any, tokenValue: string) {
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
        if (err) {
          console.error(err);
          return callback('Unauthorized');
        }
        if (!key) {
          console.error('No key found in signing key');
          return callback('Unauthorized');
        }
        const signingKey = key.publicKey || key.rsaPublicKey || '';
        verify(tokenValue, signingKey, options, (verifyError: any, decoded: any) => {
          if (verifyError) {
            console.error('verifyError', verifyError);
            return callback('Unauthorized')
          }
          return this.authenticateUser(event, callback, decoded.sub);
        })
      })
    } catch (err) {
      console.error('Invalid token', err)
      return callback('Unauthorized')
    }
  }

  authenticate(event: any, callback: any) {
    if (!event.authorizationToken) {
      console.error('No authorization token');
      return callback('Unauthorized')
    }

    const tokenParts = event.authorizationToken.split(' ')
    if (tokenParts.length !== 2) {
      console.error('Invalid authorization token');
      return callback('Unauthorized')
    }

    const bearerValue = tokenParts[0]
    const tokenValue = tokenParts[1]
    if (!(bearerValue.toLowerCase() === 'bearer' && tokenValue)) {
      console.error('Invalid authorization token bearer');
      return callback('Unauthorized')
    }

    this.authenticateToken(event, callback, tokenValue);
  }

  authenticateUser(event: any, callback: any, userId: string) {
    const effect = 'Allow'
    const resource = event.methodArn
    const authorizerContext = { userId: `User-${userId}` }
    return callback(null, childIAMPolicy(userId, effect, resource, authorizerContext))
  }
}

export const authService = new AuthService();
