/**
 * Path of child
 *
 * ElasticSearch - Services - Dynamo
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import * as bluebird from 'bluebird';
import { configService } from './config.service';

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

export const fetchAll = (): Promise<any> => {
  const dynamoClient = getAWSDynamo();
  return dynamoClient.scan({
    TableName: configService.localDynamoDBTable
  }).promise().then((data) => data.Items);
}
