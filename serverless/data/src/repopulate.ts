/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import {
  dynamoService,
  elasticSearchService,
} from './services';

async function loadData(): Promise<any> {
  const promises: Promise<any>[] = [];
  await dynamoService.loadAllItems().then((items) => {
    for (const item of items) {
      promises.push(elasticSearchService.index(item));
    }
  });
  return Promise.all(promises);
}

async function repopulate(): Promise<any> {
  await elasticSearchService.wipeIndex();
  await loadData();
  await elasticSearchService.refreshIndex();
}
repopulate();
