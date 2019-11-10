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

export function detectType(documentId: string)
{
  console.log('detectType', documentId);
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
  if (documentId.startsWith('Tag-')) {
    return 'tag';
  }
  if (documentId.startsWith('User-')) {
    return 'user';
  }

  console.log('NO VALID TYPE FOUND');
  return null;
}

export function index(document: any) {
  console.log('document', document);
  console.log('process.env.ELASTIC_SEARCH_INDEX', process.env.ELASTIC_SEARCH_INDEX);
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
    if (type === 'idea-tag') {
      linkData(document, 'idea', 'ideaId', 'tagId', 'tagIds');
    }
  });
}

export function searchOne(query: any): Promise<any> {
  const body: any = {
    query,
  };
  return client.search({
    index: process.env.ELASTIC_SEARCH_INDEX,
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
  client.delete({
    index: process.env.ELASTIC_SEARCH_INDEX,
    type: '_doc',
    id: document.id,
  }, (err, resp, status) => {
    console.log(resp);
  });
}

export function linkData(child: any, parentType: string, parentIdField: string, childIdField: string, nestedIdField: string) {
  const query: any = {
    bool: {
      must: [
        {
          term: {
            type: parentType,
          },
        },
        {
          term: {
            _id: child[parentIdField],
          },
        },
      ],
    },
  };
  console.log('query', JSON.stringify(query));
  searchOne(query).then((parent: any) => {
    console.log('parent', parent);
    if (parent) {
      if (!parent[nestedIdField]) {
        parent[nestedIdField] = [];
      }
      parent[nestedIdField].push({
        [childIdField]: child[childIdField],
      });
      console.log('child to index', child);
      console.log('parent to index', parent);
      index(parent);
    }
  });
}
