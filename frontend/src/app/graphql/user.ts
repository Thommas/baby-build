/**
 * Path of child
 *
 * GraphQL - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetAuthUser = gql`
  query GetAuthUser {
    authUser {
      id
      gamification {
        xp
        level
      }
    }
  }
`;
