/**
 * Path of child
 *
 * GraphQL - Model - Lvl
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dynamoose from 'dynamoose';

declare var process : {
  env: {
    LOCAL_DYNAMODB_ENDPOINT: string,
    LVL_TABLE: string
  }
}

if (process.env.LOCAL_DYNAMODB_ENDPOINT && process.env.LOCAL_DYNAMODB_ENDPOINT.length > 0) {
  dynamoose.local(process.env.LOCAL_DYNAMODB_ENDPOINT);
}

const TableName = process.env.LVL_TABLE;

var Schema = dynamoose.Schema;

var LvlSchema = new Schema({
  id: {
    type: String,
  },
  label: {
    type: String,
  },
  description: {
    type: String,
  },
  skillId: {
    type: String,
  },
  userId: {
    type: String,
  },
}, {
  timestamps: true
});

const Lvl = dynamoose.model(TableName, LvlSchema);

export default Lvl
