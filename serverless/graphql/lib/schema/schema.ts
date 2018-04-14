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
import favoriteType from './types/favorite';
import gamificationType from './types/gamification';
import goalType from './types/goal';
import questType from './types/quest';
import rewardType from './types/reward';
import userType from './types/user';

// Resolvers
import buildResolver from './resolvers/build';
import childResolver from './resolvers/child';
import favoriteResolver from './resolvers/favorite';
import gamificationResolver from './resolvers/gamification';
import goalResolver from './resolvers/goal';
import questResolver from './resolvers/quest';
import rewardResolver from './resolvers/reward';
import userResolver from './resolvers/user';

const typeDefs = mergeTypes([
  buildType,
  childType,
  favoriteType,
  gamificationType,
  goalType,
  questType,
  rewardType,
  userType
]);
const resolvers = mergeResolvers([
  buildResolver,
  childResolver,
  favoriteResolver,
  gamificationResolver,
  goalResolver,
  questResolver,
  rewardResolver,
  userResolver
]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
