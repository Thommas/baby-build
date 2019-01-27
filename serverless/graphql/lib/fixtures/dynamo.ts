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
import { entities } from './data';

const ddb: any = getAWSDynamo();

function deleteTable(entity: string): Promise<any> {
  const params = {
    TableName: `${configService.localDynamoDBTablePrefix}-${entity}`,
  };
  return ddb.deleteTable(params).promise().catch((err) => {
    // Ignore error
    console.log('CANNOT DELETE', entity, err);
  });
}

function createTable(entity: string): Promise<any> {
  const params = {
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
    TableName: `${configService.localDynamoDBTablePrefix}-${entity}`,
    StreamSpecification: {
      StreamEnabled: true
    }
  };
  return ddb.createTable(params).promise().catch((err) => {
    // Ignore error
    console.log('CANNOT CREATE', entity, err);
  });
}

function createDocument(entity: string, document: any): Promise<any> {
  const Model: any = entities[entity].model;
  const item = new Model({
    ...document
  });
  console.log('document', document);
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
  for (let entity of Object.keys(entities)) {
    console.log('entity', entity);
    await deleteTable(entity);
    await timeout(1000);
    await createTable(entity);
    await timeout(1000);
    await loadData(entity);
  }
}
