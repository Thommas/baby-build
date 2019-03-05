/**
 * Path of child
 *
 * GraphQL - Elasticsearch - Sharing
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { search } from '../services/elasticsearch.service';

export function querySharingsByUserId(userId: string): Promise<any> {
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

export function querySharingsBySharerId(sharerId: string): Promise<any> {
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
            sharerId,
          },
        },
      ],
    },
  };
  return search(query);
}
