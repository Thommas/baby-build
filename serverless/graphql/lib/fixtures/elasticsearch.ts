/**
 * Path of child - Fixtures
 *
 * Load fixtures for Elasticsearch
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  addNestedObject,
  createIndex,
  deleteIndex,
  index,
  refreshIndex,
  searchOne,
} from '../services';
import { entities } from '../model';
import { configuration } from './elasticsearch-config';

function loadData(entity: string): Promise<any> {
  const data: any = fs.readFileSync(path.join(__dirname, `data/${entity}.json`));
  const items: any[] = JSON.parse(data);
  const promises: Promise<any>[] = [];
  for (let item of items) {
    promises.push(index(entity, item));
  }
  return Promise.all(promises);
}

async function linkData(parentType: string, child: string, parentIdField: string): Promise<any> {
  const data: any = fs.readFileSync(path.join(__dirname, `data/${child}.json`));
  const items: any[] = JSON.parse(data);
  const promises: Promise<any>[] = [];
  for (let item of items) {
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
              _id: item[parentIdField],
            },
          },
        ],
      },
    };
    const parent = await searchOne(query);
    if (parent) {
      promises.push(addNestedObject(parentType, parent, item, 'tagIds'));
    }
  }
  return Promise.all(promises);
}

export async function loadFixtures(): Promise<any> {
  await deleteIndex();
  await createIndex(configuration);
  for (let entity of entities) {
    await loadData(entity);
  }
  await refreshIndex();
  await linkData('idea', 'idea-tag', 'ideaId');
}
