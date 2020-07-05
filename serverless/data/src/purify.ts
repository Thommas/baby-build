/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { dynamoService } from "./services";

async function purifyItems(): Promise<any> {
  let invalidItemCount = 0;
  const items = await dynamoService.loadAllItems();

  const Entity = dynamoService.getEntity();
  for (const item of items) {
    console.log('ITEM', `${item.id}`);
    for (const field in item) {
      if (item[field] === null) {
        invalidItemCount++;
        delete item[field];
        const entity: any = new Entity(item);
        await entity.save()
          .then((res) => {
            console.log(`Removed null field: ${field}`, `${res.id}`);
          })
          .catch((err) => {
            console.log('ERROR', err);
          });
      }
    }
 }

 return invalidItemCount;
}

async function purify(): Promise<any> {
  const invalidItemCount = await purifyItems();
  console.log('invalidItemCount', invalidItemCount);
}

purify().then(() => {
  console.log("Fix completed");
  process.exit();
});
