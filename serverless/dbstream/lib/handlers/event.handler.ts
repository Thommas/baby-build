/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as AWS from 'aws-sdk';
import * as elasticSearchHandler from './elasticsearch.handler';
import * as ideaHandler from './idea.handler';
import * as reviewHandler from './review.handler';

export async function handleEvent(event, callback) {
  for (const record of event.Records) {
    if (record.eventName == 'INSERT') {
      const document = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
      elasticSearchHandler.handleInsert(document);
      ideaHandler.handleInsert(document);
      await reviewHandler.handleInsert(document);
    }
    if (record.eventName == 'MODIFY') {
      const document = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
      elasticSearchHandler.handleModify(document);
      ideaHandler.handleModify(document);
      await reviewHandler.handleModify(document);
    }
    if (record.eventName == 'REMOVE') {
      const document = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.OldImage);
      elasticSearchHandler.handleRemove(document);
    }
  }
  callback(null, `Successfully processed ${event.Records.length} records.`);
}
