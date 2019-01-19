/**
 * Path of child
 *
 * GraphQL - Model - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dynamoose from 'dynamoose';
import config from './config';

config(dynamoose);

declare var process: {
  env: {
    USER_TABLE: string
  }
}

const TableName = process.env.USER_TABLE;

const Schema = dynamoose.Schema;

const UserSchema = new Schema({
  id: {
    type: String,
  },
  currentChildId: {
    type: String,
  },
  xp: {
    type: Number,
  },
  lvl: {
    type: Number,
  },
}, {
  timestamps: true
});

const User = dynamoose.model(TableName, UserSchema);

export default User
