/**
 * Path of child
 *
 * GraphQL - Model - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dynamoose from 'dynamoose';

declare var process: {
  env: {
    LOCAL_DYNAMODB_ENDPOINT: string,
    IDEA_USER_TABLE: string
  }
}

if (process.env.LOCAL_DYNAMODB_ENDPOINT && process.env.LOCAL_DYNAMODB_ENDPOINT.length > 0) {
  dynamoose.AWS.config.update({
    region: 'eu-west-2',
  });
  dynamoose.local(process.env.LOCAL_DYNAMODB_ENDPOINT);
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
