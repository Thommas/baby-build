/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { dynamoService } from './services/dynamo.service';
import { elasticSearchService } from './services/elasticsearch.service';

declare var process;

const promises = [
  dynamoService.load(),
  elasticSearchService.load(),
];

Promise.all(promises).then(() => {
  console.log('Loading data completed');
  process.exit();
});
