/**
 * Path of child
 *
 * Count - Dynamo - Count
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as db from './dynamo';

export async function incrementCount(tableName, id, field) {
  const getParams = {
    tableName,
    Key: {
      id
    },
  };

  const existingItem = await db.get(getParams);
  const newCount = existingItem[field] ? parseInt(existingItem.[field], 10) + 1 : 1;
  const args = {
    [field]: newCount
  };

  const updateParams = {
    TableName,
    Key: {
      id: existingItem.id,
    },
    ExpressionAttributeValues: {
      [`:${field}`]: args.newCount,
    },
    UpdateExpression: `SET ${field} = :${field}`,
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(updateParams, args);
}
