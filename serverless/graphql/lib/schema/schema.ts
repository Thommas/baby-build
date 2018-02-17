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
import buildType from './types/build';

// Resolvers
import childResolver from './resolvers/child';
import buildResolver from './resolvers/build';

const typeDefs = mergeTypes([childType, buildType]);
const resolvers = mergeResolvers([childResolver, buildResolver]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
