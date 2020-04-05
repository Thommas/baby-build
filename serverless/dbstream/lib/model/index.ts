/**
 * Path of child
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

export function detectType(documentId: string)
{
  console.log('detectType', documentId);
  if (!documentId) {
    return null;
  }
  if (documentId.startsWith('Idea-')) {
    return 'idea';
  }
  if (documentId.startsWith('Review-')) {
    return 'review';
  }
  if (documentId.startsWith('Sharing-')) {
    return 'sharing';
  }
  if (documentId.startsWith('User-')) {
    return 'user';
  }

  console.log('NO VALID TYPE FOUND');
  return null;
}

export const entities = [
  'idea',
  'review',
  'sharing',
  'user',
];
