/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as elasticsearch from 'elasticsearch';
import * as fs from 'fs';
import { configService } from './config.service';
import { ENTITIES } from '../model/entity.model';
import { configuration } from '../config/elasticsearch.config';

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

  index(type: string, document: any): Promise<any> {
    const id = document.id;
    delete document.id;
    return this.elasticsearchClient.index({
      index: configService.elasticSearchIndex,
      type: '_doc',
      id,
      body: {
        ...document,
        type,
      },
      refresh: true,
    });
  }

  refreshIndex(): Promise<any> {
    return this.elasticsearchClient.indices.refresh();
  }

  loadData(entity: string): Promise<any> {
    const data: any = fs.readFileSync(`${configService.dbDumpLocalPath}/${entity}.json`);
    const items: any[] = JSON.parse(data);
    const promises: Promise<any>[] = [];
    for (let item of items) {
      promises.push(this.index(entity, item));
    }
    return Promise.all(promises);
  }

  async load(): Promise<any> {
    await this.deleteIndex();
    await this.createIndex(configuration);
    for (let entity of ENTITIES) {
      await this.loadData(entity);
    }
    await this.refreshIndex();
  }
}

export const elasticSearchService = new ElasticSearchService();
