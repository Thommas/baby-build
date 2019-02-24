/**
 * Path of child
 *
 * Gamification - Dynamo - Gamification
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as db from './dynamo';
import { USER_LEVELS } from '../constants';

const TableName = process.env.GAMIFICATION_TABLE;

export function getLevel(xp: number) {
  let lvl = 1;
  for (let xpRequired of USER_LEVELS) {
    if (xp < xpRequired) {
      return lvl;
    }
    lvl++;
  }
  return 99;
}

export function getNextLevelXp(xp: number): any {
    if (xp < USER_LEVELS[0]) {
      return USER_LEVELS[0];
    }
    if (xp >= USER_LEVELS[USER_LEVELS.length - 1]) {
      return '';
    }
    for (let i = USER_LEVELS.length - 2; i >= 0; i--) {
      if (xp >= USER_LEVELS[i]) {
        return USER_LEVELS[i + 1];
      }
    }
    return '';
  }
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
        xp: xp,
        lvl: getLevel(xp),
        nextLvlXp: getNextLevelXp(xp),
      },
    };

    return db.createItem(createParams);
  }

  const newXp = parseInt(existingItem.xp, 10) + xp;
  const newLevel = getLevel(newXp);
  const args = {
    xp: newXp,
    lvl: newLevel,
    nextLvlXp: getNextLevelXp(newXp),
  };

  const updateParams = {
    TableName,
    Key: {
      id: existingItem.id,
    },
    ExpressionAttributeValues: {
      ':xp': args.xp,
      ':lvl': args.lvl,
    },
    UpdateExpression: 'SET xp = :xp, lvl = :lvl',
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(updateParams, args);
}
