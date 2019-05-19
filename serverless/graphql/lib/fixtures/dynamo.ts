/**
 * Path of child - Fixtures
 *
 * Load fixtures for DynamoDB
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as fs from 'fs';
import * as path from 'path';
import { configService, getAWSDynamo } from '../services';
import { entities, Entity } from '../model';

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
      // Ignore error
    });
}

function createDocument(entity: string, document: any): Promise<any> {
  const item = new Entity({
    ...document
  });
  return item.save();
}

function loadData(entity: string): Promise<any> {
  const data: any = fs.readFileSync(path.join(__dirname, `data/${entity}.json`));
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

export async function loadFixtures() {
  await deleteTable();
  await timeout(1000);
  await createTable();
  await timeout(1000);
  for (let entity of entities) {
    await loadData(entity);
  }
}
