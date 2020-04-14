/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { elasticSearchService } from '../services';

export function queryReviews(ideaId: string): Promise<any> {
  const query: any = {
    bool: {
      must: [
        {
          term: {
            type: 'Review',
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
  return elasticSearchService.search(query);
}
