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
  },
  buildId: {
    type: String,
  },
  userId: {
    type: String,
  },
  type: {
    type: String,
  },
}, {
  timestamps: true
});

const Task = dynamoose.model(TableName, TaskSchema);

export function getTasks(buildId, userId) {
  const params = {
    buildId: {eq: buildId},
    userId: {eq: userId}
  };
  return Task.scan(params).exec();
}

export function createTask(args, userId) {
  const task = new Task({
    id: generate('0123456789', 20),
    type: 'default',
    userId: userId,
    ...args
  });
  return task.save();
}

export function updateTask(args, userId) {
  return Task.get(args.id)
    .then((task: any) => {
      if (!task) {
        throw new Error('Task not found');
      }
      if (args.label) {
        task.label = args.label;
      }
      return task.save();
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
