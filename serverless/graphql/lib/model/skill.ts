/**
 * Path of child
 *
 * GraphQL - Model - Skill
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dynamoose from 'dynamoose';

declare var process : {
  env: {
    LOCAL_DYNAMODB_ENDPOINT: string,
    SKILL_TABLE: string
  }
}

if (process.env.LOCAL_DYNAMODB_ENDPOINT && process.env.LOCAL_DYNAMODB_ENDPOINT.length > 0) {
  dynamoose.local(process.env.LOCAL_DYNAMODB_ENDPOINT);
}

const TableName = process.env.SKILL_TABLE;

var Schema = dynamoose.Schema;

var SkillSchema = new Schema({
  id: {
    type: String,
  },
  label: {
    type: String,
  },
  description: {
    type: String,
  },
  buildId: {
    type: String,
  },
  userId: {
    type: String,
  },
}, {
  timestamps: true
});

const Skill = dynamoose.model(TableName, SkillSchema);

export default Skill
