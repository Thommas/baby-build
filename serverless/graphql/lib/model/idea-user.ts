/**
 * Path of child
 *
 * GraphQL - Model - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dynamoose from 'dynamoose';
import config from './config';

config(dynamoose);

declare var process: {
  env: {
    IDEA_USER_TABLE: string
  }
}

const TableName = process.env.IDEA_USER_TABLE;

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

const IdeaUser = dynamoose.model(TableName, IdeaUserSchema);

export default IdeaUser
