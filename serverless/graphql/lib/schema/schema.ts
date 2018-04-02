/**
 * Path of child
 *
 * GraphQL - Root Schema
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { graphqlLambda } from 'graphql-server-lambda';
import { makeExecutableSchema } from 'graphql-tools';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';

// Types
import buildType from './types/build';
import childType from './types/child';
import gamificationType from './types/gamification';
import goalType from './types/goal';
import questType from './types/quest';
import userType from './types/user';
import whitelistItemType from './types/whitelist-item';

// Resolvers
import buildResolver from './resolvers/build';
import childResolver from './resolvers/child';
import gamificationResolver from './resolvers/gamification';
import goalResolver from './resolvers/goal';
import questResolver from './resolvers/quest';
import userResolver from './resolvers/user';
import whitelistItemResolver from './resolvers/whitelist-item';

const typeDefs = mergeTypes([
  buildType,
  childType,
  gamificationType,
  goalType,
  questType,
  userType,
  whitelistItemType
]);
const resolvers = mergeResolvers([
  buildResolver,
  childResolver,
  gamificationResolver,
  goalResolver,
  questResolver,
  userResolver,
  whitelistItemResolver
]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
