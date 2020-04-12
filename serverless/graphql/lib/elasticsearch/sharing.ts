/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { elasticSearchService } from '../services';

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
  return elasticSearchService.search(query);
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
  return elasticSearchService.search(query);
}
