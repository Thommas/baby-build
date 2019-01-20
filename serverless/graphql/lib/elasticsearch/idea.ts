/**
 * Path of child
 *
 * GraphQL - Dynamo - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { search } from '../services/elasticsearch.service';

export function queryIdeas(userId): Promise<any> {
  const query: any = {
    bool: {
      must: {
        term: {
          userId
        }
      }
    }
  };
  console.log('query', query);
  return search('app', query);
}
