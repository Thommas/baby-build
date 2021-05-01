/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as fs from 'fs';
import * as AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import { configService } from './config.service';

export class DynamoService {
  private awsDynamoDB;

  constructor() {
    const serviceConfigOptions : ServiceConfigurationOptions = {
      region: configService.awsRegion,
      endpoint: `http://${configService.localDynamoDBHost}:${configService.localDynamoDBPort}`,
    };

    AWS.config.update(serviceConfigOptions);

    this.awsDynamoDB = new AWS.DynamoDB(serviceConfigOptions);
  }

  persist(entity: any) {
    for (const field in entity) {
      if (entity[field] === null) {
        delete entity[field];
      }
    }
    return entity.save();
  }

  async loadAllItems(type?: string): Promise<any[]> {
    const params: any = {
      TableName: configService.localDynamoDBTable,
    };

    let scanResults: any[] = [];
    let items;
    do {
      items = await this.awsDynamoDB.scan(params).promise();
      items.Items.forEach((item: any) => {
        const document = AWS.DynamoDB.Converter.unmarshall(item);
        // TODO Query with begin_with filter on ID
        if (!type || document.id.startsWith(type)) {
          scanResults.push(document);
        }
      });
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey != "undefined");

    return scanResults;
  }

  deleteTable(): Promise<any> {
    const params = {
      TableName: configService.localDynamoDBTable,
    };
    return this.awsDynamoDB.deleteTable(params).promise()
      .catch((err) => {
        console.log('error', err);
        // Ignore error
      });
  }

  createTable(): Promise<any> {
    const params = {
      TableName: configService.localDynamoDBTable,
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH'
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 2
      },
      StreamSpecification: {
        StreamEnabled: true,
        StreamViewType: 'NEW_AND_OLD_IMAGES',
      }
    };
    return this.awsDynamoDB.createTable(params).promise()
      .catch((err) => {
        console.log('error', err);
      });
  }

  createDocument(document: any): Promise<any> {
    const params = {
      TableName: configService.localDynamoDBTable,
      Item: AWS.DynamoDB.Converter.marshall(document)
    };
    return this.awsDynamoDB.putItem(params).promise().then(() => {
      return document;
    });
  }

  get(id: string): Promise<any> {
    const params = {
      TableName: configService.localDynamoDBTable,
      Key: {
        id: {
          S: id
        }
      }
    };
    return this.awsDynamoDB.getItem(params).promise();
  }

  batchGet(ids: string[]): Promise<any> {
    const keys = ids.map((id: string) => ({
      id: {
        S: id,
      }
    }))
    const params = {
      RequestItems: {
        [configService.localDynamoDBTable]: {
          Keys: keys
        }
      }
    };
    return this.awsDynamoDB.batchGetItem(params).promise().then((items) => {
      return items.Responses[configService.localDynamoDBTable].map((item) => AWS.DynamoDB.Converter.unmarshall(item));
    });
  }

  loadData(path: string): Promise<any> {
    const data: any = fs.readFileSync(path);
    const documents: any[] = JSON.parse(data);
    const promises: Promise<any>[] = [];
    for (let document of documents) {
      promises.push(this.createDocument(document));
    }
    return Promise.all(promises);
  }

  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async load(path: string) {
    await this.deleteTable();
    await this.timeout(5000);
    await this.createTable();
    await this.timeout(5000);
    await this.loadData(path);
  }

  // async saveData() {
  //   const items: any[] = await this.loadAllItems();
  //   fs.writeFileSync(`${configService.dbDumpLocalPath}`, JSON.stringify(items));
  // }

  // async save() {
  //   fs.unlinkSync(configService.dbDumpLocalPath);
  //   await this.saveData();
  // }
}

export const dynamoService = new DynamoService();
