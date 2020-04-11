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
