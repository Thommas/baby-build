/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { dynamoService } from './services'
import { updateIdeaImgs, updateIdeaReleaseDate } from './handlers/idea.handler';
import { updateIdeaBasedOnReviews } from './handlers/review.handler';
import { updateCharacterImg } from './handlers/character.handler';

function delay(ms) {
  return new Promise((resolve) => { setTimeout(resolve, ms) })
}

async function refreshCharacter(document: any) {
  await updateCharacterImg(document);
}

async function refreshIdea(document: any) {
  await updateIdeaImgs(document);
  await updateIdeaReleaseDate(document);
  await updateIdeaBasedOnReviews(document.id);
}

async function refreshCharacters() {
  const characters = await dynamoService.loadAllItems('Character');
  const total = characters.length;
  let i = 1;
  for (let character of characters) {
    console.log(`${i} / ${total} - ${character.id}`);
    await refreshCharacter(character);
    await delay(3000);
    i++;
  }
}

async function refreshIdeas() {
  const ideas = await dynamoService.loadAllItems('Idea');
  const total = ideas.length;
  let i = 1;
  for (let idea of ideas) {
    console.log(`${i} / ${total} - ${idea.id}`);
    await refreshIdea(idea);
    await delay(30000);
    i++;
  }
}

async function refresh() {
  await refreshCharacters();
  // await refreshIdeas();

  console.log('DONE');
  process.exit();
}
refresh();
