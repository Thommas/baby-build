/**
 * Path of child
 *
 * GraphQL - Dynamo - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { search } from '../services/elasticsearch.service';

export function queryReviews(ideaId: string): Promise<any> {
  const query: any = {
    bool: {
      must: [
        {
          term: {
            type: 'review',
          },
        },
        {
          term: {
            ideaId,
          },
        },
      ],
    },
  };
  console.log('query', query.bool.must);
  return search(query);
}
