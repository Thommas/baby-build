/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as AWS from "aws-sdk";
import { ServiceConfigurationOptions } from "aws-sdk/lib/service";
import * as bluebird from "bluebird";
import * as dynamoose from "dynamoose";
import * as fs from "fs";
import { configService } from "./config.service";

export class DynamoService {
  getDynamoose() {
    const { localDynamoDBHost, localDynamoDBPort } = configService;

    if (localDynamoDBHost && localDynamoDBPort) {
      dynamoose.AWS.config.update({
        region: "eu-west-2",
      });
      dynamoose.local(`http://${localDynamoDBHost}:${localDynamoDBPort}`);
    }

    return dynamoose;
  }

  getAWSDynamo() {
    const { localDynamoDBHost, localDynamoDBPort } = configService;

    const serviceConfigOptions: ServiceConfigurationOptions = {
      region: "eu-west-2",
      endpoint: `http://${localDynamoDBHost}:${localDynamoDBPort}`,
    };

    AWS.config.setPromisesDependency(bluebird);
    AWS.config.update(serviceConfigOptions);

    return new AWS.DynamoDB(serviceConfigOptions);
  }

  deleteTable(): Promise<any> {
    const params = {
      TableName: configService.localDynamoDBTable,
    };
    return this.getAWSDynamo()
      .deleteTable(params)
      .promise()
      .catch(() => {
        // Ignore error
      });
  }

  createTable(): Promise<any> {
    const params = {
      TableName: configService.localDynamoDBTable,
      AttributeDefinitions: [
        {
          AttributeName: "id",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "id",
          KeyType: "HASH",
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 2,
      },
      StreamSpecification: {
        StreamEnabled: true,
        StreamViewType: "NEW_AND_OLD_IMAGES",
      },
    };
    return this.getAWSDynamo()
      .createTable(params)
      .promise()
      .catch((err) => {
        console.log("error", err);
      });
  }

  getEntity() {
    const dynamoose = this.getDynamoose();

    const Schema = dynamoose.Schema;

    const EntitySchema = new Schema(
      {
        id: {
          type: String,
        },
      },
      {
        timestamps: true,
        saveUnknown: true,
      }
    );

    return dynamoose.model(configService.localDynamoDBTable, EntitySchema);
  }

  createDocument(document: any): Promise<any> {
    const Entity = this.getEntity();
    const item = new Entity({
      ...document,
    });
    return item.save().catch((err) => {
      console.log("error", err);
    });
  }

  loadData(): Promise<any> {
    const data: any = fs.readFileSync(configService.dbDumpLocalPath);
    const documents: any[] = JSON.parse(data);
    const promises: Promise<any>[] = [];
    for (let document of documents) {
      promises.push(this.createDocument(document));
    }
    return Promise.all(promises);
  }

  async loadAllItems(): Promise<any[]> {
    const params: any = {
      TableName: configService.localDynamoDBTable,
    };

    let scanResults: any[] = [];
    let items;
    do {
      items = await this.getAWSDynamo().scan(params).promise();
      items.Items.forEach((item: any) => {
        const document = AWS.DynamoDB.Converter.unmarshall(item);
        scanResults.push(document);
      });
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey != "undefined");

    return scanResults;
  }

  async saveData() {
    const items: any[] = await this.loadAllItems();
    fs.writeFileSync(`${configService.dbDumpLocalPath}`, JSON.stringify(items));
  }

  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async load() {
    await this.deleteTable();
    await this.timeout(1000);
    await this.createTable();
    await this.timeout(1000);
    await this.loadData();
  }

  async save() {
    if (fs.existsSync(configService.dbDumpLocalPath)) {
      fs.unlinkSync(configService.dbDumpLocalPath);
    }
    await this.saveData();
  }
}

export const dynamoService = new DynamoService();
