/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import {
  dynamoService,
  elasticSearchService,
} from './services';

declare var process;

const promises = [
  dynamoService.load(),
  elasticSearchService.load(),
];

Promise.all(promises).then(() => {
  console.log('Loading data completed');
  process.exit();
});
