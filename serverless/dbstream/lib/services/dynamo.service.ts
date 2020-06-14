/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import bluebird from 'bluebird';
import dynamoose from 'dynamoose';
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

  async loadAllItems(type: string): Promise<any[]> {
    const params: any = {
      TableName: configService.localDynamoDBTable,
    };

    let scanResults: any[] = [];
    let items;
    do {
      items = await this.getAWSDynamo().scan(params).promise();
      items.Items.forEach((item: any) => {
        const document = AWS.DynamoDB.Converter.unmarshall(item);
        // TODO Query with begin_with filter on ID
        if (!type || document.id.startsWith(type)) {
          scanResults.push(document);
        }
      });
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey != "undefined");

    return scanResults;
  }

  persist(entity: any) {
    for (const field in entity) {
      if (entity[field] === null) {
        delete entity[field];
        console.log(`Removed null field: ${field}`);
      }
    }
    return entity.save();
  }
}

export const dynamoService = new DynamoService();
