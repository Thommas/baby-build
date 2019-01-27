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

export function createIndex(): Promise<any> {
  return elasticsearchClient.indices.create({
    index: configService.elasticSearchIndex,
    body: {
      mappings: {
        idea: {
          properties: {
            userId: {type: 'keyword'},
          }
        }
      }
    }
  });
}

export function deleteIndex(): Promise<any> {
  return elasticsearchClient.indices.delete({
    index: configService.elasticSearchIndex,
  });
}

export function index(type: string, document: any): Promise<any> {
  return elasticsearchClient.index({
    index: configService.elasticSearchIndex,
    type,
    id: document.id,
    body: {
      ...document,
    }
  });
}

export function search(type: string, query: any) {
  return elasticsearchClient.search({
    index: configService.elasticSearchIndex,
    type,
    body: {
      query,
    }
  });
}
