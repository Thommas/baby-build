/**
 * Path of child
 *
 * Elastic search - Handlers - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as AWS from 'aws-sdk';
import { index, remove } from '../services/elasticsearch.service';

export function handleEvent(event, context, callback, table) {
  for (const record of event.Records) {
    if (record.eventName == 'INSERT' || record.eventName == 'MODIFY') {
      const document = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
      index(table, document);
    }
    if (record.eventName == 'REMOVE') {
      const document = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.OldImage);
      remove(table, document);
    }
  }
  callback(null, `Successfully processed ${event.Records.length} records.`);
}
