/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import * as bluebird from 'bluebird';
import * as dynamoose from 'dynamoose';
import * as fs from 'fs';
import { configService } from './config.service';
import { ENTITIES, getEntity } from '../model/entity.model';

class DynamoService {
  getDynamoose() {
    const {
      localDynamoDBHost,
      localDynamoDBPort,
    } = configService;

    if (localDynamoDBHost && localDynamoDBPort) {
      dynamoose.AWS.config.update({
        region: 'eu-west-2',
      });
      dynamoose.local(`http://${localDynamoDBHost}:${localDynamoDBPort}`);
    }

    return dynamoose;
  }

  getAWSDynamo() {
    const {
      localDynamoDBHost,
      localDynamoDBPort,
    } = configService;

    const serviceConfigOptions : ServiceConfigurationOptions = {
      region: 'eu-west-2',
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
    return this.getAWSDynamo().deleteTable(params).promise()
      .catch((err) => {
        // Ignore error
      });
  }

  createTable(): Promise<any> {
    console.log('configService.localDynamoDBTable', configService.localDynamoDBTable);
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

  createDocument(document: any): Promise<any> {
    const Entity = getEntity(this.getDynamoose(), configService.localDynamoDBTable);
    const item = new Entity({
      ...document
    });
    return item.save()
      .catch((err) => {
        console.log('error', err);
      });
  }

  loadData(entity: string): Promise<any> {
    const data: any = fs.readFileSync(`${configService.dbDumpLocalPath}/${entity}.json`);
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

  async load() {
    await this.deleteTable();
    await this.timeout(1000);
    await this.createTable();
    await this.timeout(1000);
    for (let entity of ENTITIES) {
      await this.loadData(entity);
    }
  }
}

export const dynamoService = new DynamoService();
