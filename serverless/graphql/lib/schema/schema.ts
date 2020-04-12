/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { makeExecutableSchema } from 'graphql-tools';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';

// Types
import ideaType from './types/idea';
import reviewType from './types/review';
import sharingType from './types/sharing';
import userType from './types/user';

// Resolvers
import ideaResolver from './resolvers/idea';
import reviewResolver from './resolvers/review';
import sharingResolver from './resolvers/sharing';
import userResolver from './resolvers/user';

export const typeDefs: any = mergeTypes([
  ideaType,
  reviewType,
  sharingType,
  userType
]);

export const resolvers: any = mergeResolvers([
  ideaResolver,
  reviewResolver,
  sharingResolver,
  userResolver
]);

const schema: any = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
