/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { authService, graphQLService } from './service';
import { handleStreamElasticsearch } from './handler/stream-elasticsearch.handler';
import { handleStreamIdea } from './handler/stream-idea.handler';
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

exports.streamElasticsearch = (event, _, callback) => {
  handleStreamElasticsearch(event, callback);
};

exports.streamIdea = (event, _, callback) => {
  handleStreamIdea(event, callback);
};

exports.sqs = (event, _, callback) => {
  handleSQS(event, callback);
};
