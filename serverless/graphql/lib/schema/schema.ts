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
import ideaType from './types/idea';
import userType from './types/user';

// Resolvers
import ideaResolver from './resolvers/idea';
import userResolver from './resolvers/user';

const typeDefs = mergeTypes([
  ideaType,
  userType
]);
const resolvers = mergeResolvers([
  ideaResolver,
  userResolver
]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
