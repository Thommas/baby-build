/**
 * Path of child
 *
 * GraphQL - Services - Dynamo
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import * as bluebird from 'bluebird';
import * as dynamoose from 'dynamoose';
import { configService } from './config.service';

export const getDynamoose = () => {
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

export const getAWSDynamo = () => {
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
