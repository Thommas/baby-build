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
    term: {
      userId
    }
  };
  return search('idea', query);
}
