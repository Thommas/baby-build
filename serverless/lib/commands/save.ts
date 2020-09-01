/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { dynamoService } from "./services/dynamo.service";

async function save(): Promise<any> {
  await dynamoService.save();
}

save().then(() => {
  console.log("Saving data completed");
  process.exit();
});
