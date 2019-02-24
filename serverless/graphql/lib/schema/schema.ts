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
import reviewType from './types/review';
import userType from './types/user';

// Resolvers
import ideaResolver from './resolvers/idea';
import reviewResolver from './resolvers/review';
import userResolver from './resolvers/user';

const typeDefs: any = mergeTypes([
  ideaType,
  reviewType,
  userType
]);
const resolvers: any = mergeResolvers([
  ideaResolver,
  reviewResolver,
  userResolver
]);

const schema: any = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
