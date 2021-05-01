/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { authService, graphQLService } from './services';
import { handleStream } from './handlers/stream.handler';
import { handleSQS } from './handlers/sqs.handler';

exports.auth = (event, _, callback) => {
  return authService.authenticate(event, callback);
}

exports.graphql = (event, context, callback) => {
  const server = graphQLService.createServer();

  const handler = server.createHandler({
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  return handler(event, context, callback);
};

exports.stream = (event, _, callback) => {
  handleStream(event, callback);
};

exports.sqs = (event, _, callback) => {
  handleSQS(event, callback);
};
