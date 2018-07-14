/**
 * Path of build
 *
 * GraphQL - Resolvers - Task
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbTask from '../../dynamo/task';

export default {
  Query: {
    tasks: (_, args, context) => dbTask.getTasks(args.buildId, context.userId),
  },
  Mutation: {
    createTask: (_, args, context) => dbTask.createTask(args, context.userId),
    updateTask: (_, args, context) => dbTask.updateTask(args, context.userId),
    deleteTask: (_, args, context) => dbTask.deleteTask(args, context.userId),
  }
};
