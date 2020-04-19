/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { configService } from "./config.service";

describe("ConfigService", () => {
  it("configuration loaded based on test environment", () => {
    expect(configService.elasticSearchIndex).toEqual("app");
    expect(configService.elasticSearchHost).toEqual("http://localhost:9200");
    expect(configService.localDynamoDBHost).toEqual("localhost");
    expect(configService.localDynamoDBPort).toEqual(4567);
    expect(configService.localDynamoDBTable).toEqual(
      "pathofchild-graphql-test"
    );
  });
});
