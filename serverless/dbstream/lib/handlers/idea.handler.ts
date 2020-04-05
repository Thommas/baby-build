/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { detectType, Entity } from '../model';
import { fetchImage } from '../services';

const MAPPING = {
  videogame: [
    {
      key: 'icon',
      searchInput: 'logo',
      limit: 1,
    },
    {
      key: 'cover',
      searchInput: 'cover',
      limit: 1,
    },
    {
      key: 'screenshot',
      searchInput: 'screenshot',
      limit: 5,
    },
  ]
};

async function fetchImgs(label: string, category: string) {
  const imgs = {};
  if (MAPPING[category]) {
    for (const data of MAPPING[category]) {
      imgs[data.key] = await fetchImage(`${label}+${category}+${data.searchInput}`, data.limit);
    }
  }
  return imgs;
}

function updateIdea(document: any) {
  if (document.imgsReady) {
    return;
  }
  return Entity.get(document.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('Idea not found');
      }
      return fetchImgs(document.label, document.category)
        .then((imgs: string[]) => {
          entity.imgs = imgs;
          entity.imgsReady = true;
          return entity.save();
        });
    })
}

export function handleInsert(document) {
  if ('idea' !== detectType(document.id)) {
    return;
  }
  updateIdea(document);
}

export function handleModify(document) {
  console.log('document', document);
  if ('idea' !== detectType(document.id)) {
    return;
  }
  updateIdea(document);
}
