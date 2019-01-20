/**
 * Path of child - Fixtures
 *
 * Load fixtures for DynamoDB and Elasticsearch
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { loadFixtures as dynamoLoadFixtures } from './dynamo';
import { loadFixtures as elasticsearchLoadFixtures } from './elasticsearch';

const promises = [
  elasticsearchLoadFixtures(),
];

Promise.all(promises).then(() => {
  console.log('Loading fixtures completed');
  process.exit();
});
