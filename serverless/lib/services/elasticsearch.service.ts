/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as elasticsearch from 'elasticsearch';
import { configService } from './config.service';
import { dynamoService } from './dynamo.service';

class ElasticSearchService {
  elasticsearchClient = new elasticsearch.Client({
    hosts: [configService.elasticSearchHost]
  });

  search(query: any, sort: any = {}, size: number = 50, cursor: string = '-1'): Promise<any> {
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

  // async index(document: any): Promise<any> {
  //   const id = document.id;
  //   const type = id.split("-")[0];
  //   delete document.imgs;
  //   return this.elasticsearchClient.index(
  //     {
  //       index: configService.elasticSearchIndex,
  //       type: "_doc",
  //       id,
  //       body: {
  //         ...document,
  //         type,
  //       },
  //     },
  //     (err, resp, status) => {
  //       if (err) {
  //         return console.error(err);
  //       }
  //       console.log(resp._id, status);
  //     }
  //   );
  // }
}

export const elasticSearchService = new ElasticSearchService();
