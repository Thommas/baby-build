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
    IDEA_TABLE: string
  }
}

const TableName = process.env.IDEA_TABLE;

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

const Idea = dynamoose.model(TableName, IdeaSchema);

export default Idea
