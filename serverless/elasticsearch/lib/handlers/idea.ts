/**
 * Path of child
 *
 * Elastic search - Handlers - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { insert } from '../services/elasticsearch';

export function handleIdea(event, context, callback) {
  event.Records.forEach((record) => {
    if (record.eventName == 'INSERT') {
      insert('idea', record.dynamodb.NewImage);
    }
  });
  callback(null, `Successfully processed ${event.Records.length} records.`);
}
