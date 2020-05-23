/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import elasticsearch from 'elasticsearch';
import { configService } from './config.service';

class ElasticSearchService {
  elasticsearchClient = new elasticsearch.Client({
    hosts: [configService.elasticSearchHost]
  });

  searchOne(query: any): Promise<any> {
    const body: any = {
      query,
    };
    return this.elasticsearchClient.search({
      index: configService.elasticSearchIndex,
      type: '_doc',
      size: 1,
      body,
    }).then((items) => {
      if (items.hits.total.value > 0) {
        return {
          id: items.hits.hits[0]._id,
          ...items.hits.hits[0]._source,
        }
      }

      return null;
    });
  }

  remove(document: any) {
    this.elasticsearchClient.delete({
      index: configService.elasticSearchIndex,
      type: '_doc',
      id: document.id,
    }, (err, resp, status) => {
      console.log(resp);
    });
  }

  refreshIndex(): Promise<any> {
    return this.elasticsearchClient.indices.refresh();
  }

  async index(document: any): Promise<any> {
    const id = document.id;
    const type = id.split('-')[0];
    return this.elasticsearchClient.index({
      index: configService.elasticSearchIndex,
      type: '_doc',
      id,
      body: {
        ...document,
        type,
      }
    }, (err, resp, status) => {
      console.log(resp);
    });
  }

  search(query: any, sort: any = {}, size: number = 100, cursor: string = '-1'): Promise<any> {
    const body: any = {
      query,
      sort,
    };
    if (cursor !== '-1') {
      body.search_after = [cursor];
    }
    return this.elasticsearchClient.search({
      index: configService.elasticSearchIndex,
      type: '_doc',
      size,
      body,
    });
  }
}

export const elasticSearchService = new ElasticSearchService();
