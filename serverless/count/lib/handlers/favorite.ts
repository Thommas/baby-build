/**
 * Path of child
 *
 * Count - Handlers - Favorite
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

// import { incrementCount } from '../dynamo/dynamo';

export function handleFavorite(event, context, callback) {
  event.Records.forEach((record) => {
    if (record.eventName == 'INSERT') {
      const userId = record.dynamodb.NewImage.user_id.S
      // addXp('user', userId, 10)
    }
  });
  callback(null, `Successfully processed ${event.Records.length} records.`);
}
