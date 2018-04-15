/**
 * Path of child
 *
 * Count - Handlers - Goal
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { incrementCount } from '../dynamo/dynamo';

const UserTableName = process.env.USER_TABLE;
const BuildTableName = process.env.BUILD_TABLE;

export function handleGoal(event, context, callback) {
  const promises = []
  event.Records.forEach((record) => {
    if (record.eventName == 'INSERT') {
      const userId = record.dynamodb.NewImage.user_id.S
      const buildId = record.dynamodb.NewImage.build_id.S
      const childYear = record.dynamodb.NewImage.child_year.S
      promises.push(incrementCount(UserTableName, userId, 'goal_count'))
      promises.push(incrementCount(BuildTableName, buildId, 'goal_count'))
      promises.push(incrementCount(BuildTableName, buildId, `year${childYear}_goal_count`))
    }
  });
  Promise.all(promises).then(() => {
    callback(null, `Successfully processed ${event.Records.length} records.`);
  })
}
