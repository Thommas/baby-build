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
import ideaUserType from './types/idea-user';
import userType from './types/user';

// Resolvers
import ideaResolver from './resolvers/idea';
import ideaUserResolver from './resolvers/idea-user';
import userResolver from './resolvers/user';

const typeDefs: any = mergeTypes([
  ideaType,
  ideaUserType,
  userType
]);
const resolvers: any = mergeResolvers([
  ideaResolver,
  ideaUserResolver,
  userResolver
]);

const schema: any = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
