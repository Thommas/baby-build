/**
 * Path of child
 *
 * GraphQL - Model - Child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dynamoose from 'dynamoose';

declare var process : {
  env: {
    LOCAL_DYNAMODB_ENDPOINT: string,
    CHILD_TABLE: string
  }
}

if (process.env.LOCAL_DYNAMODB_ENDPOINT && process.env.LOCAL_DYNAMODB_ENDPOINT.length > 0) {
  dynamoose.local(process.env.LOCAL_DYNAMODB_ENDPOINT);
}

const TableName = process.env.CHILD_TABLE;

var Schema = dynamoose.Schema;

var ChildSchema = new Schema({
  id: {
    type: String,
  },
  first_name: {
    type: String,
  },
  middle_names: {
    type: String,
  },
  last_name: {
    type: String,
  },
  nickname: {
    type: String,
  },
  gender: {
    type: Boolean,
  },
  birthdate: {
    type: Date,
  },
  userId: {
    type: String,
  },
}, {
  timestamps: true
});

const Child = dynamoose.model(TableName, ChildSchema);

export default Child
