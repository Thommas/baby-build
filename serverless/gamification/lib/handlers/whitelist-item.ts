/**
 * Path of child
 *
 * Gamification - Handlers - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { addXp } from '../dynamo/gamification';

export function handleWhitelistItem(event, context, callback) {
  event.Records.forEach((record) => {
    if (record.eventName == 'INSERT') {
      const userId = record.dynamodb.NewImage.user_id.S
      addXp('user', userId, 100)
    }
  });
  callback(null, `Successfully processed ${event.Records.length} records.`);
}
