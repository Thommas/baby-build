/**
 * Path of child - Fixtures
 *
 * Load fixtures for DynamoDB and Elasticsearch
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Idea, IdeaUser, User } from '../../model';

export const entities: string[] = [
  'idea',
  'idea-user',
  'user'
];

export const models: any = {
  'idea': Idea,
  'idea-user': IdeaUser,
  'user': User,
};
