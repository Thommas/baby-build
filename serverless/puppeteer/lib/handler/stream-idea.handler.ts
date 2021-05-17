/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import AWS from 'aws-sdk';
import { sqsService } from '../service';

export function handleInsert(document) {
  if ('Idea' !== document.id.split('-')[0]) {
    return;
  }
  sqsService.sendMessage({
    id: document.id
  });
}

export function handleModify(document) {
  if ('Idea' !== document.id.split('-')[0]) {
    return;
  }
  sqsService.sendMessage({
    id: document.id
  });
}

export async function handleStreamIdea(event, callback) {
  for (const record of event.Records) {
    if (record.eventName == 'INSERT') {
      const document = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
      handleInsert(document);
    }
    if (record.eventName == 'MODIFY') {
      const document = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
      handleModify(document);
    }
  }
  callback(null, `Successfully processed ${event.Records.length} records.`);
}
