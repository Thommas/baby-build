/**
 * Path of child
 *
 * GraphQL - DynamoDB - Child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import nanoid = require('nanoid');
import * as db from './dynamo';

const TableName = process.env.CHILD_TABLE;

export function getChildren(userId) {
  const params = {
    TableName,
    FilterExpression: 'user_id = :user_id',
    ExpressionAttributeValues: { ':user_id': userId }
  };

  return db.scan(params);
}

export function getChildById(id, userId) {
  const params = {
    TableName,
    FilterExpression: 'user_id = :user_id',
    ExpressionAttributeValues: { ':user_id': userId },
    Key: {
      id,
    },
  };

  return db.get(params);
}

export function createChild(args, userId) {
  const params = {
    TableName,
    Item: {
      id: nanoid(12),
      xp: 0,
      level: 1,
      ...args,
      user_id: userId
    },
  };

  return db.createItem(params);
}

export function updateChild(args) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
    ExpressionAttributeValues: {
      ':firstname': args.firstname,
      ':middlename': args.middlename,
      ':lastname': args.lastname,
      ':nickname': args.nickname,
      ':birthdate': args.birthdate,
      ':gender': args.gender
    },
    UpdateExpression: `SET firstname = :firstname,
    middlename = :middlename,
    lastname = :lastname,
    nickname = :nickname,
    birthdate = :birthdate,
    gender = :gender`,
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
