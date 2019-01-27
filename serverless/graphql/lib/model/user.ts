/**
 * Path of child
 *
 * GraphQL - Model - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { configService, getDynamoose } from '../services';

const dynamoose: any = getDynamoose();

const TableName = `${configService.localDynamoDBTablePrefix}-user`;

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

export const User = dynamoose.model(TableName, UserSchema);
