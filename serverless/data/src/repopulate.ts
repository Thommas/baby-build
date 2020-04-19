/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { dynamoService, elasticSearchService } from "./services";

async function loadData(): Promise<any> {
  const items = await dynamoService.loadAllItems();
  for (const item of items) {
    await elasticSearchService.index(item);
  }
}

async function repopulate(): Promise<any> {
  await elasticSearchService.wipeIndex();
  await loadData();
  await elasticSearchService.refreshIndex();
}

repopulate().then(() => {
  console.log("Repopulate completed");
  process.exit();
});
