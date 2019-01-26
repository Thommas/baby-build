/**
 * Path of child - Fixtures
 *
 * Load fixtures for DynamoDB
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as AWS from 'aws-sdk';
import * as bluebird from 'bluebird';
import * as dotenv from 'dotenv';
import * as dynamoose from 'dynamoose';
import * as fs from 'fs';
import * as path from 'path';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import { entities, models } from './data';

dotenv.config();

declare var process: {
  env: {
    LOCAL_DYNAMODB_HOST: string,
    LOCAL_DYNAMODB_PORT: string,
    LOCAL_DYNAMODB_TABLE_PREFIX: string,
  }
}

const {
  LOCAL_DYNAMODB_HOST,
  LOCAL_DYNAMODB_PORT,
  LOCAL_DYNAMODB_TABLE_PREFIX,
} = process.env;

AWS.config.setPromisesDependency(bluebird);

console.log(`http://${LOCAL_DYNAMODB_HOST}:${LOCAL_DYNAMODB_PORT}`);

const serviceConfigOptions : ServiceConfigurationOptions = {
  region: 'eu-west-2',
  endpoint: `http://${LOCAL_DYNAMODB_HOST}:${LOCAL_DYNAMODB_PORT}`,
};

console.log(`http://${LOCAL_DYNAMODB_HOST}:${LOCAL_DYNAMODB_PORT}`);

AWS.config.update(serviceConfigOptions);

dynamoose.AWS.config.update({
  region: 'eu-west-2',
});
dynamoose.local(`http://${LOCAL_DYNAMODB_HOST}:${LOCAL_DYNAMODB_PORT}`);

const ddb = new AWS.DynamoDB(serviceConfigOptions);

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
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    },
    TableName: `${LOCAL_DYNAMODB_TABLE_PREFIX}-${entity}`,
    StreamSpecification: {
      StreamEnabled: true
    }
  };
  return ddb.createTable(params).promise();
}

function createDocument(entity: string, document: any): Promise<any> {
  const Model: any = models[entity];
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

export async function loadFixtures() {
  for (let entity of entities) {
    await createTable(entity);
    await loadData(entity);
  }
}
