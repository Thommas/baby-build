/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import AWS from 'aws-sdk';
import * as elasticSearchHandler from './elasticsearch.handler';
import * as characterHandler from './character.handler';
import * as ideaHandler from './idea.handler';
import * as reviewHandler from './review.handler';

export async function handleEvent(event, callback) {
  for (const record of event.Records) {
    if (record.eventName == 'INSERT') {
      const document = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
      elasticSearchHandler.handleInsert(document);
      // characterHandler.handleModify(document);
      // ideaHandler.handleInsert(document);
      reviewHandler.handleInsert(document);
    }
    if (record.eventName == 'MODIFY') {
      const document = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
      elasticSearchHandler.handleModify(document);
      // characterHandler.handleModify(document);
      // ideaHandler.handleModify(document);
      reviewHandler.handleModify(document);
    }
    if (record.eventName == 'REMOVE') {
      const document = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.OldImage);
      elasticSearchHandler.handleRemove(document);
    }
  }
  callback(null, `Successfully processed ${event.Records.length} records.`);
}
