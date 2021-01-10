/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { elasticSearchService } from '../services';

let SIZE = 10;

export function queryWorlds(userIds: string[], filters: any, sortInput: string, page: number): Promise<any> {
  let count = SIZE;
  const query: any = {
    bool: {
      must: [
        {
          term: {
            ['type.keyword']: 'World',
          },
        },
        {
          terms: {
            ['userId.keyword']: userIds,
          },
        },
      ],
    },
  };
  if (filters) {
    if (filters.count) {
      count = filters.count;
    }
    if (filters.label) {
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
  }
  if (!sortInput) {
    sortInput = '-createdAt';
  }
  const sortKey = sortInput.replace('-', '');
  const sortOrder = sortInput[0] === '-' ? 'desc' : 'asc';
  const sort: any = {
    [sortKey]: sortOrder,
  };
  return elasticSearchService.search(query, sort, count, page);
}
