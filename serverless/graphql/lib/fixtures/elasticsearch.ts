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
  createIndex,
  deleteIndex,
  index,
  refreshIndex,
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

export async function loadFixtures(): Promise<any> {
  await deleteIndex();
  await createIndex(configuration);
  for (let entity of entities) {
    await loadData(entity);
  }
  await refreshIndex();
}
