/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { mean } from 'lodash';
import { dynamoService, elasticSearchService } from '../services';

function updateIdea(ideaId: string, args: any) {
  return dynamoService.getEntity().get(ideaId)
    .then((idea: any) => {
      if (!idea) {
        throw new Error('Idea not found');
      }
      Object.assign(idea, args);
      return idea.save();
    })
}

function queryReviewsByIdeaId(ideaId: string)
{
  const query: any = {
    bool: {
      must: [
        {
          term: {
            type: 'Review',
          },
        },
        {
          term: {
            ideaId,
          },
        },
      ],
    },
  };
  return elasticSearchService.search(query);
}

function updateIdeaBasedOnReviews(review: any) {
  return queryReviewsByIdeaId(review.ideaId)
    .then((reviews: any) => {
      if (0 === reviews.hits.hits.length) {
        return;
      }
      const score = mean(reviews.hits.hits.map((document: any) => document._source.score));
      const requiredAge = mean(reviews.hits.hits.map((document: any) => document._source.requiredAge));
      return updateIdea(review.ideaId, {
        score: score ? score : null,
        requiredAge: requiredAge ? requiredAge : null,
      });
    })
}

/**
 * It's a bit hackish but we're waiting for ES
 * to be up to date before computing average score/requiredAge
 *
 * @param ms
 */
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function handleInsert(document) {
  if ('Review' !== document.id.split('-')[0]) {
    return;
  }
  await timeout(5000);
  updateIdeaBasedOnReviews(document);
}

export async function handleModify(document) {
  if ('Review' !== document.id.split('-')[0]) {
    return;
  }
  await timeout(5000);
  updateIdeaBasedOnReviews(document);
}
