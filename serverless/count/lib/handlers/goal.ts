/**
 * Path of child
 *
 * Count - Handlers - Goal
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as db from '../dynamo/count';

const UserTableName = process.env.USER_TABLE;
const BuildTableName = process.env.BUILD_TABLE;

export function handleGoal(event, context, callback) {
  let promises = new Array<any>()
  event.Records.forEach((record) => {
    if (record.eventName == 'INSERT') {
      const userId = record.dynamodb.NewImage.user_id.S
      const buildId = record.dynamodb.NewImage.build_id.S
      const childYear = record.dynamodb.NewImage.child_year.N
      promises.push(db.incrementCount(UserTableName, userId, 'goal_count'))
      promises.push(db.incrementCount(BuildTableName, buildId, 'goal_count'))
      promises.push(db.incrementCount(BuildTableName, buildId, `year${childYear}_goal_count`))
    }
  });
  Promise.all(promises).then(() => {
    callback(null, `Successfully processed ${event.Records.length} records.`);
  })
}
