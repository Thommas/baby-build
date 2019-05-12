/**
 * Path of child
 *
 * GraphQL - Elasticsearch - Tag
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { search } from '../services/elasticsearch.service';

export function queryTags(userId: string, args: any): Promise<any> {
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
  if (args.label && args.label.length > 0) {
    query.bool.must.push({
      match: {
        label: {
          query: args.label,
          fuzziness: 2,
          prefix_length: 1,
        },
      },
    });
  }
  return search(query);
}
