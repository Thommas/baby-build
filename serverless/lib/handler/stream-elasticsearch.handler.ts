/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import AWS from 'aws-sdk';
import { elasticSearchService } from '../service';

export async function handleStreamElasticsearch(event, callback) {
  for (const record of event.Records) {
    if (record.eventName == 'INSERT') {
      const document = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
      elasticSearchService.index(document);
    }
    if (record.eventName == 'MODIFY') {
      const document = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
      elasticSearchService.index(document);
    }
    if (record.eventName == 'REMOVE') {
      const document = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.OldImage);
      elasticSearchService.remove(document);
    }
  }
  callback(null, `Successfully processed ${event.Records.length} records.`);
}
