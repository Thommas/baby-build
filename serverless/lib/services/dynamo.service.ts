/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as fs from 'fs';
import * as AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import * as dynamoose from 'dynamoose';
import { configService } from './config.service';

class DynamoService {
  getDynamoose() {
    const {
      localDynamoDBHost,
      localDynamoDBPort,
    } = configService;

    dynamoose.aws.sdk.config.update({
      region: configService.awsRegion,
    });
    dynamoose.aws.ddb.local(`http://${localDynamoDBHost}:${localDynamoDBPort}`);

    return dynamoose;
  }

  getAWSDynamo() {
    const {
      localDynamoDBHost,
      localDynamoDBPort,
    } = configService;

    const serviceConfigOptions : ServiceConfigurationOptions = {
      region: configService.awsRegion,
      endpoint: `http://${localDynamoDBHost}:${localDynamoDBPort}`,
    };

    AWS.config.update(serviceConfigOptions);

    return new AWS.DynamoDB(serviceConfigOptions);
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
      items = await this.getAWSDynamo().scan(params).promise();
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
    console.log('debug', this.getAWSDynamo().deleteTable(params));
    return this.getAWSDynamo().deleteTable(params).promise()
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
    return this.getAWSDynamo().createTable(params).promise()
      .catch((err) => {
        console.log('error', err);
      });
  }

  getEntity() {
    const dynamoose = this.getDynamoose();

    const Schema = dynamoose.Schema;

    const EntitySchema = new Schema({
      id: {
        type: String,
      },
    }, {
      timestamps: true,
      saveUnknown: true,
    });

    return dynamoose.model(configService.localDynamoDBTable, EntitySchema);
  }

  createDocument(document: any): Promise<any> {
    const Entity = this.getEntity();
    const item = new Entity({
      ...document
    });
    return item.save()
      .catch((err) => {
        console.log('error', err);
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
    await this.timeout(1000);
    await this.createTable();
    await this.timeout(1000);
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
