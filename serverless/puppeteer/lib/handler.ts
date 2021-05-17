/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { handleStreamElasticsearch } from './handler/stream-elasticsearch.handler';
import { handleStreamIdea } from './handler/stream-idea.handler';
import { handleSQS } from './handler/sqs.handler';

exports.streamElasticsearch = (event, _, callback) => {
  handleStreamElasticsearch(event, callback);
};

exports.streamIdea = (event, _, callback) => {
  handleStreamIdea(event, callback);
};

exports.sqs = (event, _, callback) => {
  handleSQS(event, callback);
};
