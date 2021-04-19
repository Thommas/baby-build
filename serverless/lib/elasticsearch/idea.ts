/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { elasticSearchService } from '../services';

let SIZE = 10;

export function getIdeas(userIds: string[], filters: any, sortInput: string, page: number): Promise<any> {
  let count = SIZE;
  const query: any = {
    bool: {
      must: [
        {
          term: {
            ['type.keyword']: 'Idea',
          },
        },
        {
          terms: {
            ['userId.keyword']: userIds,
          },
        },
      ],
      must_not: [],
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
    if (filters.category) {
      query.bool.must.push({
        term: {
          category: filters.category,
        },
      });
    }
    if (filters.label) {
      query.bool.must.push({
        match: {
          label: {
            query: filters.label,
            fuzziness: 1,
            prefix_length: 1,
          },
        },
      });
    }
    if ('hasRequiredAge' in filters) {
      if (filters.hasRequiredAge) {
        query.bool.must.push({
          exists: {
            field: 'requiredAge'
          },
        });
      } else {
        query.bool.must_not.push({
          exists: {
            field: 'requiredAge'
          },
        });
      }
    }
    if (filters.requiredAge) {
      query.bool.must.push({
        range: {
          requiredAge: {
            gte: filters.requiredAge,
            lt: filters.requiredAge + 1,
          },
        },
      });
    }
    if ('hasScore' in filters) {
      if (filters.hasScore) {
        query.bool.must.push({
          exists: {
            field: 'score'
          },
        });
      } else {
        query.bool.must_not.push({
          exists: {
            field: 'score'
          },
        });
      }
    }
    if (filters.score) {
      query.bool.must.push({
        range: {
          score: {
            gte: filters.score,
            lt: filters.score + 1,
          },
        },
      });
    }
    if (filters.language) {
      query.bool.must.push({
        match: {
          language: {
            query: filters.language,
          }
        },
      });
    }
  }
  if (!sortInput) {
    sortInput = '-createdAt';
  }
  const sortKey = sortInput.replace('-', '');
  const sortOrder = sortInput[0] === '-' ? 'desc' : 'asc';
  const sort: any = {
    [sortKey]: {
      order: sortOrder,
      unmapped_type: 'long'
    }
  };
  return elasticSearchService.search(query, sort, count, page);
}
