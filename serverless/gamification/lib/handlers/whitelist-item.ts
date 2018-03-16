/**
 * Path of child
 *
 * Gamification - Handlers - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { updateGamification } from '../dynamo/gamification';

export function handleWhitelistItem(event, context, callback) {
  event.Records.forEach((record) => {
    if (record.eventName == 'INSERT') {
      const userId = record.dynamodb.NewImage.user_id.S
      updateGamification('user', userId, 1, 2)
    }
  });
  callback(null, `Successfully processed ${event.Records.length} records.`);
}
