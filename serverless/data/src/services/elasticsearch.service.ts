/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as elasticsearch from 'elasticsearch';
import * as fs from 'fs';
import { configService } from './config.service';
import { entities } from '../model';
import { configuration } from '../config/elasticsearch.config';

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

export function refreshIndex(): Promise<any> {
  return elasticsearchClient.indices.refresh();
}

function loadData(entity: string): Promise<any> {
  const data: any = fs.readFileSync(`${configService.dbDumpLocalPath}/${entity}.json`);
  const items: any[] = JSON.parse(data);
  const promises: Promise<any>[] = [];
  for (let item of items) {
    promises.push(index(entity, item));
  }
  return Promise.all(promises);
}

export async function loadElasticSearchFixtures(): Promise<any> {
  await deleteIndex();
  await createIndex(configuration);
  for (let entity of entities) {
    await loadData(entity);
  }
  await refreshIndex();
}
