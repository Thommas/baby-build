/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

// Types
import fileType from './type/file.type';
import ideaType from './type/idea.type';
import reviewType from './type/review.type';
import userType from './type/user.type';

// Resolvers
import fileResolver from './resolver/file.resolver';
import ideaResolver from './resolver/idea.resolver';
import reviewResolver from './resolver/review.resolver';
import userResolver from './resolver/user.resolver';

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
