/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { dynamoService } from './services'
import { updateIdeaImgs, updateIdeaReleaseDate } from './handlers/idea.handler';
import { updateIdeaBasedOnReviews } from './handlers/review.handler';

function delay(ms) {
  return new Promise((resolve) => { setTimeout(resolve, ms) })
}

async function refreshIdea(document: any) {
  await updateIdeaImgs(document);
  await updateIdeaReleaseDate(document);
  await updateIdeaBasedOnReviews(document.id);
}

async function refresh() {
  const ideas = await dynamoService.loadAllItems('Idea');
  const total = ideas.length;
  let i = 1;
  for (let idea of ideas) {
    console.log(`${i} / ${total} - ${idea.id}`);
    await refreshIdea(idea);
    await delay(30000);
    i++;
  }

  console.log('DONE');
  process.exit();
}
refresh();
