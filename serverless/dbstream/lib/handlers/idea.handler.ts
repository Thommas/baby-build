/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { dynamoService, puppeteerService } from '../services';

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

async function fetchImgs(document: any) {
  const imgs = {};
  if (MAPPING[document.category]) {
    for (const data of MAPPING[document.category]) {
      imgs[data.key] = await puppeteerService.fetchImage(
        `${document.label}+${document.platform ? document.platform : document.category}+${data.searchInput}`,
        data.limit
      );
    }
  }
  return imgs;
}

function updateIdea(document: any) {
  if (document.imgsReady) {
    return;
  }
  return dynamoService.getEntity().get(document.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('Idea not found');
      }
      return fetchImgs(document)
        .then((imgs: string[]) => {
          entity.imgs = imgs;
          entity.imgsReady = true;
          return entity.save();
        });
    })
}

export function handleInsert(document) {
  if ('Idea' !== document.id.split('-')[0]) {
    return;
  }
  updateIdea(document);
}

export function handleModify(document) {
  if ('Idea' !== document.id.split('-')[0]) {
    return;
  }
  updateIdea(document);
}
