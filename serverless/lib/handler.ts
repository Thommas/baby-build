/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { ApolloServer } from 'apollo-server-lambda';
import { typeDefs, resolvers } from './schema/schema';
import { authService } from './services';
import { handleEvent } from './handlers/event.handler';

exports.auth = (event, context, callback) => {
  return authService.authenticate(event, callback);
}

exports.graphql = (event, context, callback) => {
  const server = new ApolloServer({
    playground: true,
    introspection: true,
    typeDefs,
    resolvers,
    context: ({ event, context }) => ({
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
      userId: event.requestContext.authorizer.userId,
    }),
  });

  const handler = server.createHandler({
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  return handler(event, context, callback);
};

exports.handle = (event, context, callback) => {
  handleEvent(event, callback);
};
