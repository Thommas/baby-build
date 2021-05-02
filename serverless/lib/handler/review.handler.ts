/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

// import { mean } from 'lodash';
// import { dynamoService, elasticSearchService } from '../service';

// function updateIdea(ideaId: string, args: any) {
//   return dynamoService.get(ideaId)
//     .then((idea: any) => {
//       if (!idea) {
//         throw new Error('Idea not found');
//       }
//       Object.assign(idea, args);
//       return idea.save();
//     })
// }

// function queryReviewsByIdeaId(ideaId: string)
// {
//   const query: any = {
//     bool: {
//       must: [
//         {
//           term: {
//             ['type.keyword']: 'Review',
//           },
//         },
//         {
//           term: {
//             ['ideaId.keyword']: ideaId,
//           },
//         },
//       ],
//     },
//   };
//   return elasticSearchService.search(query);
// }

// export function updateIdeaBasedOnReviews(ideaId: string) {
//   return queryReviewsByIdeaId(ideaId)
//     .then((reviews: any) => {
//       if (0 === reviews.hits.hits.length) {
//         console.log('No review found');
//         return;
//       }
//       const scores = reviews.hits.hits
//         .filter((document: any) => document._source.score)
//         .map((document: any) => document._source.score);
//       const score = scores.length > 0 ? mean(scores) : undefined;

//       const requiredAges = reviews.hits.hits
//         .filter((document: any) => document._source.requiredAge)
//         .map((document: any) => document._source.requiredAge);
//       const requiredAge = requiredAges.length > 0 ? mean(requiredAges) : undefined;

//       console.log('computed average score: ', score);
//       console.log('computed average requiredAge: ', requiredAge);

//       if (score && requiredAge) {
//         return updateIdea(ideaId, {
//           score: score ? score : null,
//           requiredAge: requiredAge ? requiredAge : null,
//         });
//       }
//     })
// }

// /**
//  * It's a bit hackish but we're waiting for ES
//  * to be up to date before computing average score/requiredAge
//  *
//  * @param ms
//  */
// function timeout(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// export async function handleInsert(document) {
//   if ('Review' !== document.id.split('-')[0]) {
//     return;
//   }
//   await timeout(5000);
//   updateIdeaBasedOnReviews(document.ideaId);
// }

// export async function handleModify(document) {
//   if ('Review' !== document.id.split('-')[0]) {
//     return;
//   }
//   await timeout(5000);
//   updateIdeaBasedOnReviews(document.ideaId);
// }
