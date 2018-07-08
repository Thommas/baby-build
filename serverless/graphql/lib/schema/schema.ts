/**
 * Path of build
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
import taskType from './types/task';
import userType from './types/user';

// Resolvers
import buildResolver from './resolvers/build';
import taskResolver from './resolvers/task';
import userResolver from './resolvers/user';

const typeDefs = mergeTypes([
  buildType,
  taskType,
  userType
]);
const resolvers = mergeResolvers([
  buildResolver,
  taskResolver,
  userResolver
]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
