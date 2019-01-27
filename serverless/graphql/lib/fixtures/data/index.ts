/**
 * Path of child - Fixtures
 *
 * Load fixtures for DynamoDB and Elasticsearch
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Idea, IdeaUser, User } from '../../model';

export const entities: any = {
  'idea': {
    model: Idea,
  },
  'idea-user': {
    model: IdeaUser,
  },
  'user': {
    model: User,
  },
};
