/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { dynamoService, elasticSearchService } from "./services";

async function load(): Promise<any> {
  await dynamoService.load();
  await elasticSearchService.load();
}

load().then(() => {
  console.log("Loading data completed");
  process.exit();
});
