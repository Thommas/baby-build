/**
 * Path of child
 *
 * GraphQL - Dynamo - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { search } from '../services/elasticsearch.service';

export function queryIdeas(userIds: string[], args: any): Promise<any> {
  const query: any = {
    bool: {
      must: [
        {
          term: {
            type: 'idea',
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
  if (args.requiredAge && args.requiredAge.length > 0) {
    for (const requiredAge of args.requiredAge) {
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
  if (args.score && args.score.length > 0) {
    for (const score of args.score) {
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
  return search(query);
}
