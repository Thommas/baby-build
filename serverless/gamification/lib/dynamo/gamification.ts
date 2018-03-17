/**
 * Path of child
 *
 * Gamification - Dynamo - Gamification
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import nanoid = require('nanoid');
import * as db from './dynamo';
import { USER_LEVELS } from '../constants';

const TableName = process.env.GAMIFICATION_TABLE;

export function getLevel(xp: number) {
  let level = 1;
  for (let xpRequired of USER_LEVELS) {
    if (xp < xpRequired) {
      return level;
    }
    level++;
  }
  return 99;
}

export async function addXp(entityType, entityId, xp) {
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

  const newXp = parseInt(existingItem.xp) + parseInt(xp);

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
      ':xp': newXp,
      ':level': getLevel(newXp),
    },
    UpdateExpression: 'SET xp = :xp, level = :level',
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(updateParams, existingItem);
}
