/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as elasticsearch from 'elasticsearch';
import { detectType } from '../model';
import { configService } from './config.service';

export const elasticsearchClient = new elasticsearch.Client({
  hosts: [configService.elasticSearchHost]
});

export async function wipeIndex() {
  return elasticsearchClient.indices.delete({
      index: '_all'
  }, function(err, res) {
      if (err) {
          console.error(err.message);
      } else {
          console.log('Indexes have been deleted!');
      }
  });
}

export async function index(document: any) {
  console.log('document', document);
  console.log('configService.elasticSearchIndex', configService.elasticSearchIndex);
  const id = document.id;
  console.log('id', id);
  const type = detectType(id);

  console.log('type', type);

  if (null === type) {
    return;
  }

  console.log('id', id);
  console.log('document', document);
  console.log('type', type);

  return elasticsearchClient.index({
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

export function searchOne(query: any): Promise<any> {
  const body: any = {
    query,
  };
  return elasticsearchClient.search({
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

export function remove(document: any) {
  elasticsearchClient.delete({
    index: configService.elasticSearchIndex,
    type: '_doc',
    id: document.id,
  }, (err, resp, status) => {
    console.log(resp);
  });
}

export function refreshIndex(): Promise<any> {
  return elasticsearchClient.indices.refresh();
}
