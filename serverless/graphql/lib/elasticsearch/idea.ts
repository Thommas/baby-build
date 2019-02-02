/**
 * Path of child
 *
 * GraphQL - Dynamo - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { search } from '../services/elasticsearch.service';

export function queryIdeas(userId: string, args: any): Promise<any> {
  const query: any = {
    bool: {
      must: [
        {
          term: {
            userId
          }
        },
      ],
    },
  };
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
  console.log('query', query);
  return search('idea', query);
}
