/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { dynamoService, elasticSearchService } from "../services";

var commandArgs = process.argv.slice(2);

async function load(): Promise<any> {
  if (commandArgs.length > 0) {
    const dataFolder = commandArgs[0];
    const path = __dirname + '/../../data/' + dataFolder;

    console.log(`Loading fixtures from folder: ${dataFolder}`);

    await dynamoService.load(path);
    await elasticSearchService.load();
  }
}

load().then(() => {
  console.log("Loading data completed");
  process.exit();
});
