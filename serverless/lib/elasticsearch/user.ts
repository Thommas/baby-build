/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { elasticSearchService } from '../services';

export function queryUsersBySearchQuery(searchQuery: string): Promise<any> {
  const query: any = {
    bool: {
      must: [
        {
          term: {
            type: 'User',
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
  return elasticSearchService.search(query);
}
