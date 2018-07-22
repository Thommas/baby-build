/**
 * Path of child
 *
 * GraphQL - Model - Task
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dynamoose from 'dynamoose';

declare var process : {
  env: {
    TASK_TABLE: string
  }
}

const TableName = process.env.TASK_TABLE;

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
  parentId: {
    type: String,
  },
  type: {
    type: String,
  },
}, {
  timestamps: true
});

const Task = dynamoose.model(TableName, TaskSchema);

export default Task
