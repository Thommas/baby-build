/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

 import { dynamoService, elasticSearchService } from ".";

 class FixturesService {
   async load(dataFolder: string) {
      const path = __dirname + '/../../data/' + dataFolder;

      await dynamoService.load(path);
      await elasticSearchService.load();
   }
 }

 export const fixturesService = new FixturesService();
