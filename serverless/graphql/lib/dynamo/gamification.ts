/**
 * Path of child
 *
 * GraphQL - DynamoDB - Gamification
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import nanoid = require('nanoid');
import * as db from './dynamo';

const TableName = process.env.GAMIFICATION_TABLE;

export function getGamification(entityType, entityId) {
  const params = {
    TableName,
    Key: {
      id,
      entity_type: entityType,
      entity_id: entityId
    },
  };

  return = db.get(params);
}

export function updateGamification(args) {
  const params = {
    TableName,
    Key: {
      id,
      entity_type: args.entity_type,
      entity_id: args.entity_id
    },
  };

  const existingItem = db.get(params);

  if (!existingItem) {
    const params = {
      TableName,
      Item: {
        id: nanoid(12),
        entity_type: args.entity_type,
        entity_id: args.entity_id,
        xp: 0,
        level: 1
      },
    };

    return db.createItem(params);
  }

  const params = {
    TableName,
    Key: {
      id: existingItem.id,
    },
    ExpressionAttributeNames: {
      '#xp': 'xp',
      '#level': 'level',
    },
    ExpressionAttributeValues: {
      ':xp': args.xp,
      ':level': args.level,
    },
    UpdateExpression: 'SET xp = :xp, level = :level',
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(params, args);
}
