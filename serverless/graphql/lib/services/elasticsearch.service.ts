/**
 * Path of child
 *
 * Elastic search - Services - Elastic search
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as elasticsearch from 'elasticsearch';

declare var process: {
  env: {
    ELASTIC_SEARCH_HOST: string,
    ELASTIC_SEARCH_INDEX: string,
  }
}

const client = new elasticsearch.Client({
  hosts: [process.env.ELASTIC_SEARCH_HOST]
});

export function search(type: string, query: any) {
  return client.search({
    index: process.env.ELASTIC_SEARCH_INDEX,
    type,
    body: {
      query,
    }
  });
}
