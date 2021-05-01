/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as fs from 'fs';
import { ConfigService } from "./config.service";

describe("ConfigService", () => {
  const currentProcessEnv = process.env;
  afterEach(() => {
    process.env = currentProcessEnv;
  });
  it("validation error", () => {
    process.env = {
      NODE_ENV: 'production',
      LOCAL_DYNAMODB_PORT: 'invalid port number',
    };
    expect(() => {
      new ConfigService();
    }).toThrow(new Error(`Config validation error: "LOCAL_DYNAMODB_PORT" must be a number`));
  });
  it("constructor in production environment", () => {
    process.env = {
      NODE_ENV: 'production',
    };
    const configService = new ConfigService();
    expect(configService).toBeInstanceOf(ConfigService);
  });
  it("configuration loaded based on test environment", () => {
    process.env = {};
    spyOn(fs, 'readFileSync').and.returnValue(`
      ELASTIC_SEARCH_INDEX=app
      ELASTIC_SEARCH_HOST=http://localhost:9200
      LOCAL_DYNAMODB_HOST=localhost
      LOCAL_DYNAMODB_PORT=4567
      LOCAL_DYNAMODB_TABLE=pathofchild-graphql-test
    `);
    const configService = new ConfigService();
    expect(configService.elasticSearchIndex).toEqual("app");
    expect(configService.elasticSearchHost).toEqual("http://localhost:9200");
    expect(configService.localDynamoDBHost).toEqual("localhost");
    expect(configService.localDynamoDBPort).toEqual(4567);
    expect(configService.localDynamoDBTable).toEqual(
      "pathofchild-graphql-test"
    );
    // expect(configService.dbDumpLocalPath).toContain(
    //   "db/pathofchild-graphql-test.json"
    // );
  });
  it("constructor without NODE_ENV specified", () => {
    process.env = {};
    spyOn(fs, 'readFileSync').and.returnValue('');
    const configService = new ConfigService();
    expect(configService).toBeInstanceOf(ConfigService);
  });
});
