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
import { configService } from './services';
import { entities, Entity } from '../model';

export const getDynamoose = () => {
  const {
    localDynamoDBHost,
    localDynamoDBPort,
  } = configService;

  console.log('localDynamoDBHost', localDynamoDBHost);
  console.log('localDynamoDBPort', localDynamoDBPort);

  if (localDynamoDBHost && localDynamoDBPort) {
    dynamoose.AWS.config.update({
      region: 'eu-west-2',
    });
    dynamoose.local(`http://${localDynamoDBHost}:${localDynamoDBPort}`);
  }

  return dynamoose;
}

export const getAWSDynamo = () => {
  const {
    localDynamoDBHost,
    localDynamoDBPort,
  } = configService;

  console.log('localDynamoDBHost', localDynamoDBHost);
  console.log('localDynamoDBPort', localDynamoDBPort);

  const serviceConfigOptions : ServiceConfigurationOptions = {
    region: 'eu-west-2',
    endpoint: `http://${localDynamoDBHost}:${localDynamoDBPort}`,
  };

  AWS.config.setPromisesDependency(bluebird);
  AWS.config.update(serviceConfigOptions);

  return new AWS.DynamoDB(serviceConfigOptions);
}

const ddb: any = getAWSDynamo();

function deleteTable(): Promise<any> {
  const params = {
    TableName: configService.localDynamoDBTable,
  };
  return ddb.deleteTable(params).promise()
    .catch((err) => {
      // Ignore error
    });
}

function createTable(): Promise<any> {
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
  return ddb.createTable(params).promise()
    .catch((err) => {
      console.log('error', err);
    });
}

function createDocument(entity: string, document: any): Promise<any> {
  const item = new Entity({
    ...document
  });
  return item.save()
    .catch((err) => {
      console.log('error', err);
    });
}

function loadData(entity: string): Promise<any> {
  const data: any = fs.readFileSync(`${configService.dbDumpLocalPath}/${entity}.json`);
  const documents: any[] = JSON.parse(data);
  const promises: Promise<any>[] = [];
  for (let document of documents) {
    promises.push(createDocument(entity, document));
  }
  return Promise.all(promises);
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function loadDynamoFixtures() {
  await deleteTable();
  await timeout(1000);
  await createTable();
  await timeout(1000);
  for (let entity of entities) {
    await loadData(entity);
  }
}
