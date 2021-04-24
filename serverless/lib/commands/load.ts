/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { dynamoService, elasticSearchService } from "../services";

var commandArgs = process.argv.slice(2);

async function load(): Promise<any> {
  if (commandArgs.length > 0) {
    console.log(`Loading fixtures ${commandArgs[0]}}`);
    await dynamoService.load(commandArgs[0]);
    await elasticSearchService.load();
  }
}

load().then(() => {
  console.log("Loading data completed");
  process.exit();
});
