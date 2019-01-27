/**
 * Path of child
 *
 * GraphQL - Model - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { configService, getDynamoose } from '../services';

const dynamoose: any = getDynamoose();

const TableName = `${configService.localDynamoDBTablePrefix}-idea-user`;

const Schema = dynamoose.Schema;

const IdeaUserSchema = new Schema({
  id: {
    type: String,
  },
  ideaId: {
    type: String,
  },
  userId: {
    type: String,
  },
  requiredAge: {
    type: Number,
  },
  requiredAgeExplanation: {
    type: String,
  },
  score: {
    type: Number,
  },
  scoreExplanation: {
    type: String,
  },
}, {
  timestamps: true
});

export const IdeaUser = dynamoose.model(TableName, IdeaUserSchema);
