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

export function index(type: string, document: any) {
  client.index({
    index: process.env.ELASTIC_SEARCH_INDEX,
    type,
    id: document.id,
    body: {
      ...document,
    }
  }, (err, resp, status) => {
    console.log(resp);
  });
}

export function remove(type: string, document: any) {
  client.delete({
    index: process.env.ELASTIC_SEARCH_INDEX,
    type,
    id: document.id,
  }, (err, resp, status) => {
    console.log(resp);
  });
}
