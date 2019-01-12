/**
 * Path of child
 *
 * Elastic search - Services - Elastic search
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import elasticsearch from 'elasticsearch';

const index = process.env.ELASTIC_SEARCH_INDEX;
const host = process.env.ELASTIC_SEARCH_HOST;

const client = new elasticsearch.Client({
  hosts: [host]
});

export function insert(type: string, document: any) {
  client.index({
    index,
    id: document.id,
    type,
    body: {
      ...document,
    }
  }, (err, resp, status) => {
    console.log(resp);
  });
}
