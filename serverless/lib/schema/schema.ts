/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

// Types
import fileType from './types/file';
import ideaType from './types/idea';
import reviewType from './types/review';
import userType from './types/user';

// Resolvers
import fileResolver from './resolvers/file';
import ideaResolver from './resolvers/idea';
import reviewResolver from './resolvers/review';
import userResolver from './resolvers/user';

export const typeDefs: any = mergeTypeDefs([
  fileType,
  ideaType,
  reviewType,
  userType
]);

export const resolvers: any = mergeResolvers([
  fileResolver,
  ideaResolver,
  reviewResolver,
  userResolver,
]);

const schema: any = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
