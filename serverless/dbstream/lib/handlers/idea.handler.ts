/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { IDEA_IMGS_CONFIG } from '../config/idea.config';
import { dynamoService, puppeteerService } from '../services';

async function fetchImgs(document: any) {
  const imgs = {};
  if (IDEA_IMGS_CONFIG[document.category]) {
    for (const data of IDEA_IMGS_CONFIG[document.category]) {
      imgs[data.key] = await puppeteerService.fetchImage(
        `"${document.label}"+${document.platform ? document.platform : document.category}+${data.searchInput}`,
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
          const ideaLabel = `${document.label} ${document.category} ${document.platform ? document.platform : ''}`;
          console.log(`Updated images for idea: ${ideaLabel}`)
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
