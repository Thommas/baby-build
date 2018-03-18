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
      id: entityType + '-' + entityId
    },
  };

  return db.get(params);
}
