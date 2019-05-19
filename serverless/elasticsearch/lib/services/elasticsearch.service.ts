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

export function detectType(documentId: any)
{
  if (!documentId) {
    return null;
  }
  if (documentId.startsWith('IdeaTag-')) {
    return 'idea-tag';
  }
  if (documentId.startsWith('Idea-')) {
    return 'idea';
  }
  if (documentId.startsWith('Review-')) {
    return 'review';
  }
  if (documentId.startsWith('Sharing-')) {
    return 'sharing';
  }
  if (documentId.startsWith('User-')) {
    return 'user';
  }

  return null;
}

export function index(document: any) {
  console.log('document', document);
  const id = document.id;
  const type = detectType(id);

  if (null === type) {
    return;
  }

  delete document.id;

  client.index({
    index: process.env.ELASTIC_SEARCH_INDEX,
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

export function remove(document: any) {
  client.delete({
    index: process.env.ELASTIC_SEARCH_INDEX,
    type: '_doc',
    id: document.id,
  }, (err, resp, status) => {
    console.log(resp);
  });
}
