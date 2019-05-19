/**
 * Path of child
 *
 * GraphQL - Elasticsearch - IdeaTag
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { search } from '../services/elasticsearch.service';

export function queryIdeaTagsByIdeaId(ideaId: string): Promise<any> {
  const query: any = {
    bool: {
      must: [
        {
          term: {
            type: 'idea-tag',
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
  return search(query);
}
