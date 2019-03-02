/**
 * Path of child
 *
 * GraphQL - Dynamo - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { search } from '../services/elasticsearch.service';

export function querySharings(userId: string): Promise<any> {
  const query: any = {
    bool: {
      must: [
        {
          term: {
            type: 'sharing',
          },
        },
        {
          term: {
            userId,
          },
        },
      ],
    },
  };
  return search(query);
}
