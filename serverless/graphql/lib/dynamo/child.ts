/**
 * VGADB
 *
 * GraphQL - DynamoDB
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import uuid = require('uuid/v4');
import * as db from './dynamo';

const TableName = 'childs';

export function getChilds() {
  const params = {
    TableName,
    AttributesToGet: [
      'id',
      'title'
    ],
  };

  return db.scan(params);
}

export function getChildById(id) {
  const params = {
    TableName,
    Key: {
      id,
    },
  };

  return db.get(params);
}

export function createChild(args) {
  const params = {
    TableName,
    Item: {
      id: uuid(),
      title: args.title
    },
  };

  return db.createItem(params);
}

export function updateChild(args) {
  const params = {
    TableName: 'childs',
    Key: {
      id: args.id,
    },
    ExpressionAttributeValues: {
      ':title': args.title
    },
    UpdateExpression: 'SET title = :title',
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(params, args);
}

export function deleteChild(args) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
}
