/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { authService, graphqlService } from './services';
import { handleEvent } from './handlers/event.handler';

exports.auth = (event, context, callback) => {
  return authService.authenticate(event, callback);
}

exports.graphql = (event, context, callback) => {
  const server = graphqlService.createServer();

  const handler = server.createHandler({
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  return handler(event, context, callback);
};

exports.stream = (event, context, callback) => {
  handleEvent(event, callback);
};
