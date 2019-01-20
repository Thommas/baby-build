/**
 * Path of child - Fixtures
 *
 * Load fixtures for Elasticsearch
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as elasticsearch from 'elasticsearch';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

declare var process: {
  env: {
    ELASTIC_SEARCH_HOST: string,
    ELASTIC_SEARCH_INDEX: string,
  }
}

const client = new elasticsearch.Client({
  hosts: [process.env.ELASTIC_SEARCH_HOST]
});

function deleteIndex(): Promise<any> {
  return client.indices.delete({
    index: process.env.ELASTIC_SEARCH_INDEX,
  });
}

function createIndex(): Promise<any> {
  return client.indices.create({
    index: process.env.ELASTIC_SEARCH_INDEX,
    body: {
      mappings: {
        idea: {
          properties: {
            userId: {type: 'keyword'},
          }
        }
      }
    }
  });
}

function index(type: string, document: any): Promise<any> {
  return client.index({
    index: process.env.ELASTIC_SEARCH_INDEX,
    type,
    id: document.id,
    body: {
      ...document,
    }
  });
}

function loadData(): Promise<any> {
  const data: any = fs.readFileSync(path.join(__dirname, '../data/idea.json'));
  const items: any[] = JSON.parse(data);
  const promises: Promise<any>[] = [];
  for (let item of items) {
    promises.push(index('idea', item));
  }
  return Promise.all(promises);
}

export async function loadFixtures(): Promise<any> {
  await deleteIndex();
  await createIndex();
  await loadData();
}
