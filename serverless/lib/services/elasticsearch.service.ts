/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as elasticsearch from '@elastic/elasticsearch';
import { configService } from './config.service';
import { dynamoService } from './dynamo.service';

const ITEMS_PER_PAGE = 10;

class ElasticSearchService {
  elasticsearchClient = new elasticsearch.Client({
    node: configService.elasticSearchHost
  });

  search(query: any, sort: any = {}, size: number = ITEMS_PER_PAGE, page: number = 1): Promise<any> {
    const body: any = {
      query,
      sort,
    };
    return this.elasticsearchClient.search({
      index: configService.elasticSearchIndex,
      size,
      from: (page - 1) * ITEMS_PER_PAGE,
      body,
    }).catch((err) => {
      console.log('err', err);
      return [];
    });
  }

  searchOne(query: any): Promise<any> {
    const body: any = {
      query,
    };
    return this.elasticsearchClient.search({
      index: configService.elasticSearchIndex,
      size: 1,
      body,
    }).then((res) => {
      const { hits } = res.body.hits;
      if (hits.total.value > 0) {
        return {
          id: hits[0]._id,
          ...hits[0]._source,
        }
      }

      return null;
    });
  }

  suggest(field: string, value: string): Promise<any> {
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
      size: 5,
      body,
    });
  }

  remove(document: any) {
    this.elasticsearchClient.delete({
      index: configService.elasticSearchIndex,
      id: document.id,
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
    });
  }

  createIndex(): Promise<any> {
    return this.elasticsearchClient.indices.create({
      index: configService.elasticSearchIndex,
    });
  }

  deleteIndex(): Promise<any> {
    return this.elasticsearchClient.indices
      .delete({
        index: configService.elasticSearchIndex,
      })
      .catch(() => {
        // Ignore error
      });
  }

  // refreshIndex(): Promise<any> {
  //   return this.elasticsearchClient.indices.refresh();
  // }

  async loadData(): Promise<any> {
    const items: any = await dynamoService.loadAllItems();
    const promises: Promise<any>[] = [];
    for (let item of items) {
      promises.push(this.index(item));
    }
    return Promise.all(promises);
  }

  async load(): Promise<any> {
    await this.deleteIndex();
    await this.createIndex();
    await this.loadData();
    await this.refreshIndex();
  }

  async wipeIndex(): Promise<any> {
    return this.elasticsearchClient.indices.delete(
      {
        index: "_all",
      },
      function (err, res) {
        if (err) {
          console.error(err.message);
        } else {
          console.log("Indexes have been deleted!", res);
        }
      }
    );
  }
}

export const elasticSearchService = new ElasticSearchService();
