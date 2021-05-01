/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { authService, graphQLService } from './service';
import { handleStream } from './handler/stream.handler';
import { handleSQS } from './handler/sqs.handler';

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
