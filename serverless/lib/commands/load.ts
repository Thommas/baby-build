/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { fixturesService } from "../services";

var commandArgs = process.argv.slice(2);

async function load(): Promise<any> {
  if (commandArgs.length > 0) {
    const dataFolder = commandArgs[0];

    console.log(`Loading fixtures from folder: ${dataFolder}`);

    await fixturesService.load(dataFolder);
  }
}

load().then(() => {
  console.log("Loading data completed");
  process.exit();
});
