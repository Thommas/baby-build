/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { authService, graphQLService } from './service';

exports.auth = (event, _, callback) => {
  return authService.authenticate(event, callback);
}

exports.hello = (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello world',
        input: event,
      },
      null,
      2
    ),
  };
};

exports.graphql = (event, context, callback) => {
  const server = graphQLService.createServer();

  const handler = server.createHandler({
    cors: {
      origin: 'http://localhost:4200',
      credentials: true,
    },
  });

  return handler(event, context, callback);
};
