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
import childType from './types/child';
import taskType from './types/task';
import userType from './types/user';

// Resolvers
import childResolver from './resolvers/child';
import taskResolver from './resolvers/task';
import userResolver from './resolvers/user';

const typeDefs = mergeTypes([
  childType,
  taskType,
  userType
]);
const resolvers = mergeResolvers([
  childResolver,
  taskResolver,
  userResolver
]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
