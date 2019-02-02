/**
 * Path of child - Fixtures
 *
 * Load fixtures for Elasticsearch
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as fs from 'fs';
import * as path from 'path';
import { createIndex, deleteIndex, index } from '../services';

const mappings: any = {
  idea: {
    properties: {
      userId: {type: 'keyword'},
      requiredAge: {type: 'double'},
      score: {type: 'double'},
    }
  }
};

function loadData(): Promise<any> {
  const data: any = fs.readFileSync(path.join(__dirname, 'data/idea.json'));
  const items: any[] = JSON.parse(data);
  const promises: Promise<any>[] = [];
  for (let item of items) {
    promises.push(index('idea', item));
  }
  return Promise.all(promises);
}

export async function loadFixtures(): Promise<any> {
  await deleteIndex();
  await createIndex(mappings);
  await loadData();
}
