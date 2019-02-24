/**
 * Path of child
 *
 * Elastic search - Services - Elastic search
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as elasticsearch from 'elasticsearch';
import { configService } from './config.service';

export const elasticsearchClient = new elasticsearch.Client({
  hosts: [configService.elasticSearchHost]
});

export function createIndex(body: any): Promise<any> {
  return elasticsearchClient.indices.create({
    index: configService.elasticSearchIndex,
    body
  });
}

export function deleteIndex(): Promise<any> {
  return elasticsearchClient.indices.delete({
    index: configService.elasticSearchIndex,
  }).catch((err) => {
    // Ignore error
  });
}

export function index(type: string, document: any): Promise<any> {
  return elasticsearchClient.index({
    index: configService.elasticSearchIndex,
    type: '_doc',
    id: document.id,
    body: {
      ...document,
      type,
    }
  });
}

export function search(query: any) {
  return elasticsearchClient.search({
    index: configService.elasticSearchIndex,
    type: '_doc',
    body: {
      query,
    }
  });
}
