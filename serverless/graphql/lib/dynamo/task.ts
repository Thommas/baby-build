/**
 * Path of child
 *
 * GraphQL - Dynamo - Task
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import generate = require('nanoid/generate');
import Task from '../model/task';

export function getTasks(args, userId) {
  const params: any = {
    buildId: {eq: args.buildId},
    userId: {eq: userId}
  };
  if (args.parentId) {
    params.parentId = {eq: args.parentId}
  }
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
      if (args.description) {
        task.description = args.description;
      }
      return task.save();
    });
}

export function deleteTask(args, userId) {
  return Task.get(args.id)
    .then((task: any) => {
      if (!task) {
        throw new Error('Task not found');
      }
      return task.delete();
    });
}
