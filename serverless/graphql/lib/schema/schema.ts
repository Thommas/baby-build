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
import ideaTagType from './types/idea-tag';
import reviewType from './types/review';
import sharingType from './types/sharing';
import tagType from './types/tag';
import userType from './types/user';

// Resolvers
import ideaResolver from './resolvers/idea';
import ideaTagResolver from './resolvers/idea-tag';
import reviewResolver from './resolvers/review';
import sharingResolver from './resolvers/sharing';
import tagResolver from './resolvers/tag';
import userResolver from './resolvers/user';

const typeDefs: any = mergeTypes([
  ideaType,
  ideaTagType,
  reviewType,
  sharingType,
  tagType,
  userType
]);
const resolvers: any = mergeResolvers([
  ideaResolver,
  ideaTagResolver,
  reviewResolver,
  sharingResolver,
  tagResolver,
  userResolver
]);

const schema: any = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
