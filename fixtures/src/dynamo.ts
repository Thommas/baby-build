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

dotenv.config();

declare var process: {
  env: {
    LOCAL_DYNAMODB_HOST: string,
    LOCAL_DYNAMODB_PORT: string,
  }
}

const {
  LOCAL_DYNAMODB_HOST,
  LOCAL_DYNAMODB_PORT,
} = process.env;

AWS.config.setPromisesDependency(bluebird);

console.log(`http://${LOCAL_DYNAMODB_HOST}:${LOCAL_DYNAMODB_PORT}`);

const serviceConfigOptions : ServiceConfigurationOptions = {
  region: 'eu-west-2',
  endpoint: `http://${LOCAL_DYNAMODB_HOST}:${LOCAL_DYNAMODB_PORT}`,
};

AWS.config.update(serviceConfigOptions);

dynamoose.AWS.config.update({
  region: 'eu-west-2',
});
dynamoose.local(`http://${LOCAL_DYNAMODB_HOST}:${LOCAL_DYNAMODB_PORT}`);

const ddb = new AWS.DynamoDB(serviceConfigOptions);

function createTable(tableName: string): Promise<any> {
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
    TableName: tableName,
    StreamSpecification: {
      StreamEnabled: true
    }
  };
  return ddb.createTable(params).promise();
}

function createIdea(tableName: string, document: any): Promise<any> {
  const Schema = dynamoose.Schema;

  const IdeaSchema = new Schema({
    id: {
      type: String,
    },
    label: {
      type: String,
    },
    userId: {
      type: String,
    },
  }, {
    timestamps: true
  });

  const Idea = dynamoose.model(tableName, IdeaSchema);

  const idea = new Idea({
    ...document
  });
  console.log('document', document);
  return idea.save();
}

function loadData(): Promise<any> {
  const data: any = fs.readFileSync(path.join(__dirname, '../data/idea.json'));
  const items: any[] = JSON.parse(data);
  const promises: Promise<any>[] = [];
  for (let item of items) {
    promises.push(createIdea('pathofchild-graphql-dev-idea', item));
  }
  return Promise.all(promises);
}

export async function loadFixtures() {
  await createTable('pathofchild-graphql-dev-idea');
  await createTable('pathofchild-graphql-dev-idea-user');
  await createTable('pathofchild-graphql-dev-user');
  await loadData();
}
