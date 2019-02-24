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
import { entities } from '../model';

const configuration: any = {
  settings: {
    analysis: {
      filter: {
        autocomplete_filter: {
          type: 'edge_ngram',
          min_gram: 1,
          max_gram: 20
        }
      },
      analyzer: {
        autocomplete: {
          type: 'custom',
          tokenizer: 'standard',
          filter: [
            'lowercase',
            'autocomplete_filter',
          ]
        }
      }
    }
  },
  mappings: {
    _doc: {
      properties: {
        label: {
          type: 'text',
          analyzer: 'autocomplete',
          search_analyzer: 'standard'
        },
        requiredAge: {
          type: 'double',
        },
        score: {
          type: 'double',
        },
        requiredAgeExplanation: {
          type: 'text',
          analyzer: 'autocomplete',
          search_analyzer: 'standard'
        },
        scoreExplanation: {
          type: 'text',
          analyzer: 'autocomplete',
          search_analyzer: 'standard'
        },
        xp: {
          type: 'integer',
        },
        lvl: {
          type: 'integer',
        },
        userId: {
          type: 'keyword',
        },
        ideaId: {
          type: 'keyword',
        },
      }
    }
  }
};

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
}
