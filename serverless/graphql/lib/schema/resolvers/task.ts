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
    tasks: (_, args, context) => dbTask.getTasks(args.build_id, context.user_id),
  },
  Mutation: {
    createTask: (_, args, context) => dbTask.createTask(args, context.user_id),
    updateTask: (_, args, context) => dbTask.updateTask(args, context.user_id),
    deleteTask: (_, args, context) => dbTask.deleteTask(args, context.user_id),
  }
};
