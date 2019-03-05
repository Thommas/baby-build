/**
 * Path of child
 *
 * GraphQL - Elasticsearch - Tag
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { search } from '../services/elasticsearch.service';

export function queryTags(userId: string): Promise<any> {
  const query: any = {
    bool: {
      must: [
        {
          term: {
            type: 'tag',
          },
        },
        {
          term: {
            userId,
          },
        }
      ],
    }
  };
  return search(query);
}
