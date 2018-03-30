/**
 * Path of child
 *
 * GraphQL - DynamoDB
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import AWS = require('aws-sdk');
import { DynamoDB } from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';

if (process.env.LOCAL_DYNAMODB_ENDPOINT) {
  const serviceConfigurationOptions: ServiceConfigurationOptions = {
    region: 'local',
    endpoint: process.env.LOCAL_DYNAMODB_ENDPOINT
  };
  AWS.config.update(serviceConfigurationOptions);
}

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export function scan(params) {
  return new Promise((resolve, reject) =>
    dynamoDb.scan(params).promise()
      .then(data => resolve(data.Items))
      .catch(err => reject(err)),
  );
}

export function get(params) {
  return new Promise((resolve, reject) =>
    dynamoDb.get(params).promise()
      .then(data => resolve(data.Item))
      .catch(err => reject(err)),
  );
}

export function createItem(params) {
  return new Promise((resolve, reject) =>
    dynamoDb.put(params).promise()
      .then(() => resolve(params.Item))
      .catch(err => reject(err)),
  );
}

export function updateItem(params, args) {
  return new Promise((resolve, reject) =>
    dynamoDb.update(params).promise()
      .then(() => resolve(args))
      .catch(err => reject(err)),
  );
}

export function deleteItem(params, args) {
  return new Promise((resolve, reject) =>
    dynamoDb.delete(params).promise()
      .then(() => resolve(args))
      .catch(err => reject(err)),
  );
}
