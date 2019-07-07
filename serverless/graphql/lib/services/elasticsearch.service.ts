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
  const id = document.id;
  delete document.id;
  return elasticsearchClient.index({
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

export function search(query: any): Promise<any> {
  return elasticsearchClient.search({
    index: configService.elasticSearchIndex,
    type: '_doc',
    size: 100,
    body: {
      query,
    }
  });
}

export function searchOne(query: any): Promise<any> {
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

export function addNestedObject(parentType: string, parent: any, child: any, field: string): Promise<any> {
  if (!parent[field]) {
    parent[field] = [];
  }
  parent[field].push(child);
  return this.index(parentType, parent);
}

export function refreshIndex(): Promise<any> {
  return elasticsearchClient.indices.refresh();
}
