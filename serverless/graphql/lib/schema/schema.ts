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
import itemType from './types/item';
import userType from './types/user';

// Resolvers
import childResolver from './resolvers/child';
import itemResolver from './resolvers/item';
import userResolver from './resolvers/user';

const typeDefs = mergeTypes([
  childType,
  itemType,
  userType
]);
const resolvers = mergeResolvers([
  childResolver,
  itemResolver,
  userResolver
]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
