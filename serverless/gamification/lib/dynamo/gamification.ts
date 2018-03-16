/**
 * Path of child
 *
 * Gamification - Dynamo - Gamification
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import nanoid = require('nanoid');
import * as db from './dynamo';

const TableName = process.env.GAMIFICATION_TABLE;

export async function updateGamification(entityType, entityId, xp, level) {
  const id = entityType + '-' + entityId;

  const getParams = {
    TableName,
    Key: {
      id
    },
  };

  const existingItem = await db.get(getParams);

  if (!existingItem) {
    const createParams = {
      TableName,
      Item: {
        id,
        xp: 0,
        level: 1
      },
    };

    return db.createItem(createParams);
  }

  const updateParams = {
    TableName,
    Key: {
      id: existingItem.id,
    },
    ExpressionAttributeNames: {
      '#xp': 'xp',
      '#level': 'level',
    },
    ExpressionAttributeValues: {
      ':xp': xp,
      ':level': level,
    },
    UpdateExpression: 'SET xp = :xp, level = :level',
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(updateParams, existingItem);
}
