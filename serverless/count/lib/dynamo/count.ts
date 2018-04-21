/**
 * Path of child
 *
 * Count - Dynamo - Count
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as db from './dynamo';

export async function incrementCount(tableName, id, field): Promise<any> {
  const getParams: any = {
    TableName: tableName,
    Key: {
      id
    },
  };

  const existingItem: any = await db.get(getParams);
  const newCount: number = existingItem[field] ? parseInt(existingItem[field], 10) + 1 : 1;
  const args: any = {
    [field]: newCount
  };

  const updateParams: any = {
    TableName: tableName,
    Key: {
      id: existingItem.id,
    },
    ExpressionAttributeValues: {
      [`:${field}`]: args[field],
    },
    UpdateExpression: `SET ${field} = :${field}`,
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(updateParams, args);
}
