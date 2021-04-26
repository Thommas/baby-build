/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */


import * as AWS from "aws-sdk";
// import * as dynamoose from "dynamoose";
import { Substitute } from '@fluffy-spoon/substitute';
import { dynamoService, DynamoService } from "./dynamo.service";

describe("DynamoService", () => {
  it("getDynamoose", () => {
    expect(dynamoService.getDynamoose()).toBeDefined();
  });
  it("getAWSDynamo", () => {
    expect(dynamoService.getAWSDynamo()).toBeDefined();
    expect(dynamoService.getAWSDynamo()).toBeInstanceOf(AWS.DynamoDB);
  });
  describe("deleteTable", () => {
    it("valid", async() => {
      const realDynamoService = new DynamoService();
      const fakeDynamoService = Substitute.for<DynamoService>();

      const fakeAWSDynamoDB = Substitute.for<AWS.DynamoDB>();
      const fakeAWSRequest = Substitute.for<AWS.Request<AWS.DynamoDB.DeleteTableOutput, AWS.AWSError>>();

      fakeAWSDynamoDB.deleteTable().returns(fakeAWSRequest);
      fakeDynamoService.deleteTable().mimicks(realDynamoService.deleteTable.bind(fakeAWSDynamoDB));
      fakeDynamoService.getAWSDynamo().returns(fakeAWSDynamoDB);
      fakeAWSRequest.promise().returns(new Promise(() => 42));

      const result = await fakeDynamoService.deleteTable();
      expect(result).toEqual(42);
    });
    // FIXME
    // it("error", async() => {
    //   const realDynamoService = new DynamoService();
    //   const fakeDynamoService = Substitute.for<DynamoService>();

    //   const fakeAWSDynamoDB = Substitute.for<AWS.DynamoDB>();
    //   const fakeAWSRequest = Substitute.for<AWS.Request<AWS.DynamoDB.DeleteTableOutput, AWS.AWSError>>();

    //   fakeAWSDynamoDB.deleteTable().returns(fakeAWSRequest);
    //   fakeDynamoService.deleteTable().mimicks(realDynamoService.deleteTable.bind(fakeAWSDynamoDB));
    //   fakeDynamoService.getAWSDynamo().returns(fakeAWSDynamoDB);
    //   fakeAWSRequest.promise().throws(new Error());

    //   const result = await fakeDynamoService.deleteTable();
    //   expect(result).toBeDefined();
    // });
  });
  describe("createTable", () => {
    it("valid", async() => {
      const realDynamoService = new DynamoService();
      const fakeDynamoService = Substitute.for<DynamoService>();

      const fakeAWSDynamoDB = Substitute.for<AWS.DynamoDB>();
      const fakeAWSRequest = Substitute.for<AWS.Request<AWS.DynamoDB.DeleteTableOutput, AWS.AWSError>>();

      fakeAWSDynamoDB.createTable().returns(fakeAWSRequest);
      fakeDynamoService.createTable().mimicks(realDynamoService.createTable.bind(fakeAWSDynamoDB));
      fakeDynamoService.getAWSDynamo().returns(fakeAWSDynamoDB);
      fakeAWSRequest.promise().returns(new Promise(() => 42));

      const result = await fakeDynamoService.createTable();
      expect(result).toEqual(42);
    });
    // FIXME
    // it("error", async() => {
    //   const realDynamoService = new DynamoService();
    //   const fakeDynamoService = Substitute.for<DynamoService>();

    //   const fakeAWSDynamoDB = Substitute.for<AWS.DynamoDB>();
    //   const fakeAWSRequest = Substitute.for<AWS.Request<AWS.DynamoDB.DeleteTableOutput, AWS.AWSError>>();
    //   const fakePromise = Substitute.for<Promise<any>>();

    //   fakeAWSDynamoDB.createTable().returns(fakeAWSRequest);
    //   fakeDynamoService.createTable().mimicks(realDynamoService.createTable.bind(fakeAWSDynamoDB));
    //   fakeDynamoService.getAWSDynamo().returns(fakeAWSDynamoDB);
    //   fakeAWSRequest.promise().returns(new Promise(() => {
    //     throw new Error('test');
    //   }));

    //   const result = await fakeDynamoService.createTable();
    //   // expect(result).toEqual('test');
    // });
  });
  it("getEntity", async() => {
    expect(dynamoService.getAWSDynamo()).toBeDefined();
  });
});
