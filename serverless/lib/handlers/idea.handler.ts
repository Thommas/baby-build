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
      const category = document.category === 'videogame' && document.platform ? document.platform : document.category;
      imgs[data.key] = await puppeteerService.fetchImgs(
        `"${document.label}"+${category}+${data.searchInput}`,
        data.limit,
        data.getOriginal
      );
    }
  }
  return imgs;
}

export function updateIdeaReleaseDate(document: any) {
  if (document.releaseDate) {
    return;
  }
  return dynamoService.getEntity().get(document.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('Idea not found');
      }
      const category = document.category === 'videogame' && document.platform ? document.platform : document.category;
      return puppeteerService.fetchReleaseDate(`"${document.label}"+${category}`)
        .then((releaseDate: number|null) => {
          console.log(`Release date ${releaseDate} found for idea: ${document.label}`)
          if (releaseDate) {
            entity.releaseDate = releaseDate;
            return dynamoService.persist(entity);
          } else {
            entity.releaseDate = '????';
            return dynamoService.persist(entity);
          }
        });
    })
}

export function updateIdeaImgs(document: any) {
  return dynamoService.getEntity().get(document.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('Idea not found');
      }
      return fetchImgs(document)
        .then((imgs: string[]) => {
          entity.imgs = imgs;
          entity.imgsReady = true;
          const platform = document.category === 'videogame' && document.platform ? document.platform : '';
          const ideaLabel = `${document.label} ${document.category} ${platform}`;
          console.log(`Updated images for idea: ${ideaLabel}`)
          return dynamoService.persist(entity);
        });
    })
}

function updateIdea(document: any) {
  updateIdeaReleaseDate(document);
  if (document.imgsReady) {
    return;
  }
  updateIdeaImgs(document);
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
