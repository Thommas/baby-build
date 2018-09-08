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
    LOCAL_DYNAMODB_ENDPOINT: string,
    BUILD_TABLE: string
  }
}

if (process.env.LOCAL_DYNAMODB_ENDPOINT && process.env.LOCAL_DYNAMODB_ENDPOINT.length > 0) {
  dynamoose.local(process.env.LOCAL_DYNAMODB_ENDPOINT);
}

const TableName = process.env.BUILD_TABLE;

var Schema = dynamoose.Schema;

var BuildSchema = new Schema({
  id: {
    type: String,
  },
  label: {
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
