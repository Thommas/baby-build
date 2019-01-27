/**
 * Path of child
 *
 * GraphQL - Model - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { configService, getDynamoose } from '../services';

const dynamoose: any = getDynamoose();

const TableName = `${configService.localDynamoDBTablePrefix}-idea`;
console.log('TableName', TableName);

const Schema = dynamoose.Schema;

const IdeaSchema = new Schema({
  id: {
    type: String,
  },
  label: {
    type: String,
  },
  userId: {
    type: String,
  },
}, {
  timestamps: true
});

export const Idea = dynamoose.model(TableName, IdeaSchema);
