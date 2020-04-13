/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { elasticSearchService } from '../services';

let SIZE = 150;

export function queryIdeas(userIds: string[], filters: any, sortInput: string, cursor: string): Promise<any> {
  const query: any = {
    bool: {
      must: [
        {
          term: {
            type: 'Idea',
          },
        },
        {
          terms: {
            userId: userIds,
          },
        },
      ],
    },
  };
  if (filters) {
    if (filters.count) {
      count = filters.count;
    }
    if (filters.ids && filters.ids.length > 0) {
      query.bool.must.push({
        terms: {
          id: filters.ids,
        },
      });
    }
    if (filters.label && filters.label.length > 0) {
      query.bool.must.push({
        match: {
          label: {
            query: filters.label,
            fuzziness: 2,
            prefix_length: 1,
          },
        },
      });
    }
    if (filters.requiredAge && filters.requiredAge.length > 0) {
      for (const requiredAge of filters.requiredAge) {
        query.bool.must.push({
          range: {
            requiredAge: {
              gte: requiredAge,
              lt: requiredAge + 1,
            },
          },
        });
      }
    }
    if (filters.score && filters.score.length > 0) {
      for (const score of filters.score) {
        query.bool.must.push({
          range: {
            score: {
              gte: score,
              lt: score + 1,
            },
          },
        });
      }
    }
  }
  const sortKey = sortInput.replace('-', '');
  const sortOrder = sortInput[0] === '-' ? 'desc' : 'asc';
  const sort: any = {
    [sortKey]: sortOrder,
  };
  return elasticSearchService.search(query, sort, SIZE, cursor);
}
