/**
 * Path of build
 *
 * GraphQL - DynamoDB - Task
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import generate = require('nanoid/generate');
import * as db from './dynamo';
import * as dynamoose from 'dynamoose';

declare var process : {
  env: {
    TASK_TABLE: string,
    LOCAL_DYNAMODB_ENDPOINT: string
  }
}

const TableName = process.env.TASK_TABLE;

dynamoose.local(process.env.LOCAL_DYNAMODB_ENDPOINT);

var Schema = dynamoose.Schema;

var TaskSchema = new Schema({
  id: {
    type: String,
  },
  label: {
    type: String,
  },
  description: {
    type: String,
  }
});

const Task = dynamoose.model(TableName, TaskSchema);

export function getTasks(buildId, userId) {
  const params = {
    TableName,
    FilterExpression: 'build_id = :build_id AND user_id = :user_id',
    ExpressionAttributeValues: {
      ':build_id': buildId,
      ':user_id': userId
    },
  };

  return db.scan(params);
}

export function createTask(args, userId) {
  const params = {
    TableName,
    Item: {
      id: generate('0123456789', 20),
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
      type: 'default',
      ...args,
      user_id: userId
    },
  };

  return db.createItem(params);
}

export function updateTask(args, userId) {
  return Task.get(args.id)
    .then((task: any) => {
      if (!task) {
        throw new Error('Task not found');
      }
      if (args.name) {
        task.name = args.name;
      }
      console.log('SAAAAVE');
      return task.save();
    })
    .then(() => {
      console.log('SAAAAVED');
    })
    .catch((e) => {
      console.log('ERROR', e)
    });
}

export function deleteTask(args, userId) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
}
