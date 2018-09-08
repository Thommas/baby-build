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
import lvlType from './types/lvl';
import skillType from './types/skill';
import userType from './types/user';

// Resolvers
import buildResolver from './resolvers/build';
import lvlResolver from './resolvers/lvl';
import skillResolver from './resolvers/skill';
import userResolver from './resolvers/user';

const typeDefs = mergeTypes([
  buildType,
  lvlType,
  skillType,
  userType
]);
const resolvers = mergeResolvers([
  buildResolver,
  lvlResolver,
  skillResolver,
  userResolver
]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
