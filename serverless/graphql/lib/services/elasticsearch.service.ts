/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as elasticsearch from 'elasticsearch';
import { configService } from './config.service';

class ElasticSearchService {
  elasticsearchClient = new elasticsearch.Client({
    hosts: [configService.elasticSearchHost]
  });

  search(query: any, sort: any = {}, size: number = 100, cursor: string = '-1'): Promise<any> {
    const body: any = {
      query,
      sort,
    };
    if (cursor !== '-1') {
      body.search_after = [cursor];
    }
    return this.search({
      index: configService.elasticSearchIndex,
      type: '_doc',
      size,
      body,
    });
  }

  searchOne(query: any): Promise<any> {
    return this.search(query).then((items) => {
      if (items.hits.total.value > 0) {
        return {
          id: items.hits.hits[0]._id,
          ...items.hits.hits[0]._source,
        }
      }

      return null;
    });
  }

  suggest(type: string, field: string, value: string): Promise<any> {
    const body: any = {
      query : {
        bool: {
          must: [
            {
              term: {
                type: 'idea',
              },
            },
            {
              match: {
                [field]: value,
              },
            },
          ],
        },
      },
      suggest : {
        suggestion: {
          text: value,
          term: {
            [field]: value,
          }
        }
      }
    };
    return this.elasticsearchClient.search({
      index: configService.elasticSearchIndex,
      type: '_doc',
      size: 5,
      body,
    });
  }
}

export const elasticSearchService = new ElasticSearchService();
