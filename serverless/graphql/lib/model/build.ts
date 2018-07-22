/**
 * Path of child
 *
 * GraphQL - Model - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dynamoose from 'dynamoose';

declare var process : {
  env: {
    BUILD_TABLE: string
  }
}

const TableName = process.env.BUILD_TABLE;

var Schema = dynamoose.Schema;

var BuildSchema = new Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  userId: {
    type: String,
  },
}, {
  timestamps: true
});

const Build = dynamoose.model(TableName, BuildSchema);

export default Build
