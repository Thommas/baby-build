/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { dynamoService, puppeteerService } from '../services';

export function updateCharacterImg(document: any) {
  return dynamoService.get(document.id)
    .then((entity: any) => {
      if (!entity) {
        throw new Error('Character not found');
      }
      return puppeteerService.fetchImgs(
        document.label,
        1,
        true
      ).then((imgs) => {
        entity.img = imgs[0];
        entity.imgsReady = true;
        console.log(`Updated image for character: ${document.label}`)
        return dynamoService.persist(entity);
      });
    });
}

function updateCharacter(document: any) {
  if (document.imgsReady) {
    return;
  }
  updateCharacterImg(document);
}

export function handleInsert(document) {
  if ('Character' !== document.id.split('-')[0]) {
    return;
  }
  updateCharacter(document);
}

export function handleModify(document) {
  if ('Character' !== document.id.split('-')[0]) {
    return;
  }
  updateCharacter(document);
}
