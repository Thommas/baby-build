/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { dynamoService, elasticSearchService } from "./services";

function delay(ms) {
  return new Promise((resolve) => { setTimeout(resolve, ms) })
}

async function loadData(): Promise<any> {
  const items = await dynamoService.loadAllItems();

  // await dynamoService.deleteTable();
  // await dynamoService.timeout(1000);
  // await dynamoService.createTable();
  // await dynamoService.timeout(1000);

  // const Entity = dynamoService.getEntity();
  for (const item of items) {
    // console.log('PERSIST', item.id);
    // delete item.createdAt;
    // delete item.updatedAt;
    // const entity: any = new Entity(item);
    // await entity.save()
    //   .then((res) => {
    //     console.log('SUCCESS', res.id);
    //     console.log('SUCCESS', res.createdAt);
    //     console.log('SUCCESS', res.updatedAt);
    //   })
    //   .catch((err) => {
    //     console.log('ERROR', err);
    //   });
    await delay(100);
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
