/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

 import { dynamoService, elasticSearchService } from ".";

 class FixturesService {
   async load(fixturesName: string) {
     await dynamoService.load();
     await elasticSearchService.wipeIndex();
     await elasticSearchService.load();
     await elasticSearchService.refreshIndex();
   }
 }

 export const fixturesService = new FixturesService();
