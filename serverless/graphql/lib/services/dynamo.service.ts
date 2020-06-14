/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import * as bluebird from 'bluebird';
import * as dynamoose from 'dynamoose';
import { configService } from './config.service';

class DynamoService {
  getDynamoose() {
    const {
      localDynamoDBHost,
      localDynamoDBPort,
    } = configService;

    if (localDynamoDBHost && localDynamoDBPort) {
      dynamoose.aws.sdk.config.update({
        region: 'eu-west-2',
      });
      dynamoose.aws.ddb.local(`http://${localDynamoDBHost}:${localDynamoDBPort}`);
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

  persist(entity: any) {
    for (const field in entity) {
      if (entity[field] === null) {
        delete entity[field];
      }
    }
    return entity.save();
  }
}

export const dynamoService = new DynamoService();
