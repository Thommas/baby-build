/**
 * Path of child
 *
 * GraphQL - Model - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dynamoose from 'dynamoose';

declare var process : {
  env: {
    LOCAL_DYNAMODB_ENDPOINT: string,
    IDEA_TABLE: string
  }
}

if (process.env.LOCAL_DYNAMODB_ENDPOINT && process.env.LOCAL_DYNAMODB_ENDPOINT.length > 0) {
  dynamoose.local(process.env.LOCAL_DYNAMODB_ENDPOINT);
}

const TableName = process.env.IDEA_TABLE;

var Schema = dynamoose.Schema;

var IdeaSchema = new Schema({
  id: {
    type: String,
  },
  label: {
    type: String,
  },
  required_age: {
    type: Number,
  },
  required_age_explanation: {
    type: String,
  },
  score: {
    type: Number,
  },
  score_explanation: {
    type: String,
  },
  userId: {
    type: String,
  },
}, {
  timestamps: true
});

const Idea = dynamoose.model(TableName, IdeaSchema);

export default Idea
