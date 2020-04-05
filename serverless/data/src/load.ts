/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { loadDynamoFixtures } from './dynamo';
import { loadElasticSearchFixtures } from './elasticsearch';

declare var process;

const promises = [
  loadDynamoFixtures(),
  loadElasticSearchFixtures(),
];

Promise.all(promises).then(() => {
  console.log('Loading fixtures completed');
  process.exit();
});
