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
import worldType from './types/world';

// Resolvers
import ideaResolver from './resolvers/idea';
import reviewResolver from './resolvers/review';
import sharingResolver from './resolvers/sharing';
import userResolver from './resolvers/user';
import worldResolver from './resolvers/world';

export const typeDefs: any = mergeTypes([
  ideaType,
  reviewType,
  sharingType,
  userType,
  worldType
]);

export const resolvers: any = mergeResolvers([
  ideaResolver,
  reviewResolver,
  sharingResolver,
  userResolver,
  worldResolver
]);

const schema: any = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
