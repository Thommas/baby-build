/**
 * Path of child
 *
 * GraphQL - Model
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { configService, getDynamoose } from '../services';

const dynamoose: any = getDynamoose();

const Schema = dynamoose.Schema;

const EntitySchema = new Schema({
  id: {
    type: String,
  },
}, {
  timestamps: true,
  saveUnknown: true,
});

export const Entity = dynamoose.model(configService.localDynamoDBTable, EntitySchema);

export const entities = [
  'idea',
  'review',
  'sharing',
  'user',
];
