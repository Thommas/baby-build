/**
 * Path of child
 *
 * GraphQL - Dynamo - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { search } from '../services/elasticsearch.service';

export function queryUsersBySearchQuery(searchQuery: string): Promise<any> {
  const query: any = {
    bool: {
      must: [
        {
          term: {
            type: 'user',
          },
        },
        {
          bool: {
            should: [
              {
                match: {
                  firstName: {
                    query: searchQuery,
                    fuzziness: 2,
                    prefix_length: 1,
                  },
                },
              },
              {
                match: {
                  lastName: {
                    query: searchQuery,
                    fuzziness: 2,
                    prefix_length: 1,
                  },
                },
              },
            ],
          }
        }
      ],
    }
  };
  return search(query);
}
