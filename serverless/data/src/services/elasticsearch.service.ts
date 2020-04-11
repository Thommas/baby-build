/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as elasticsearch from 'elasticsearch';
import * as fs from 'fs';
import { configService } from './config.service';
import { ELASTIC_SEARCH_CONFIG } from '../config/elasticsearch.config';

class ElasticSearchService {
  elasticsearchClient = new elasticsearch.Client({
    hosts: [configService.elasticSearchHost]
  });

  createIndex(body: any): Promise<any> {
    return this.elasticsearchClient.indices.create({
      index: configService.elasticSearchIndex,
      body
    });
  }

  deleteIndex(): Promise<any> {
    return this.elasticsearchClient.indices.delete({
      index: configService.elasticSearchIndex,
    }).catch((err) => {
      // Ignore error
    });
  }

  refreshIndex(): Promise<any> {
    return this.elasticsearchClient.indices.refresh();
  }

  loadData(): Promise<any> {
    const data: any = fs.readFileSync(configService.dbDumpLocalPath);
    const items: any[] = JSON.parse(data);
    const promises: Promise<any>[] = [];
    for (let item of items) {
      promises.push(this.index(item));
    }
    return Promise.all(promises);
  }

  async load(): Promise<any> {
    await this.deleteIndex();
    await this.createIndex(ELASTIC_SEARCH_CONFIG);
    await this.loadData();
    await this.refreshIndex();
  }

  async wipeIndex(): Promise<any> {
    return this.elasticsearchClient.indices.delete({
        index: '_all'
    }, function(err, res) {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Indexes have been deleted!');
        }
    });
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
}

export const elasticSearchService = new ElasticSearchService();
