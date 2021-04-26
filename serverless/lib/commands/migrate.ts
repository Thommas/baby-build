/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

// import { dynamoService } from "./services";

// async function migrateItems(): Promise<any> {
//   const items = await dynamoService.loadAllItems();

//   for (const item of items) {
//     if (!item.id.match(/World-.*/)) {
//       continue;
//     }
//     console.log('ITEM', `${item.id} - ${item.label}`);
//     await dynamoService.getEntity().get(item.id)
//       .then((entity: any) => {
//         return entity.delete();
//       });
//  }
// }

// async function migrate(): Promise<any> {
//   await migrateItems();
// }

// migrate().then(() => {
//   console.log("Fix date completed");
//   process.exit();
// });
