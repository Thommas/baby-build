/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import uuid from 'uuid/v4';
import { meanBy } from 'lodash';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap, map, withLatestFrom, mergeMap } from 'rxjs/operators';
import {
  CreateReviewMutation,
  GetIdeas,
  GetReviews,
  UpdateReviewMutation
} from '../graphql';
import { ApolloService } from '../services';
import {
  CreateReview,
  ReviewActionTypes,
  SelectReview,
  UpdateReview
} from '../store';
import { IdeaFacade } from './idea.facade';
import { UserFacade } from './user.facade';

@Injectable()
export class ReviewFacade {
  reviews$: Observable<any>;
  loggedUserReview$: Observable<any>;
  selectedReview$ = this.store.pipe(select('review', 'selected'));

  constructor(
    private actions$: Actions,
    private apolloService: ApolloService,
    private ideaFacade: IdeaFacade,
    private userFacade: UserFacade,
    private store: Store<{ review: any }>
  ) {
    this.reviews$ = this.ideaFacade.selectedIdea$.pipe(
      flatMap((selectedIdea: any) => {
        if (!selectedIdea) {
          return of([]);
        }
        return this.userFacade.user$.pipe(
          flatMap((user: any) => {
            if (!user) {
              return of([]);
            }
            return this.apolloService.apolloClient.watchQuery<any>({
              query: GetReviews,
              variables: {
                ideaId: selectedIdea.id,
              },
            })
              .valueChanges
              .pipe(
                map(({ data }) => {
                  if (!data || !data.reviews) {
                    return [];
                  }
                  return data.reviews.filter((review: any) => review.userId !== user.id);
                })
              );
          }),
        );
      }),
    );

    this.loggedUserReview$ = this.ideaFacade.selectedIdea$.pipe(
      flatMap((selectedIdea: any) => {
        if (!selectedIdea) {
          return of([]);
        }
        return this.userFacade.user$.pipe(
          flatMap((user: any) => {
            if (!user) {
              return of([]);
            }
            return this.apolloService.apolloClient.watchQuery<any>({
              query: GetReviews,
              variables: {
                ideaId: selectedIdea.id,
              },
            })
              .valueChanges
              .pipe(
                map(({ data }) => {
                  if (!data || !data.reviews) {
                    return null;
                  }
                  let loggedUserReview = data.reviews.find((review: any) => review.userId === user.id);
                  if (!loggedUserReview) {
                    loggedUserReview = {
                      user,
                      userId: user.id,
                      ideaId: selectedIdea.id,
                    };
                  }
                  return loggedUserReview;
                })
              );
            }),
        );
      }),
    );
  }

  selectReview(review: any) {
    this.store.dispatch(new SelectReview(review));
  }

  createReview(review: any) {
    this.store.dispatch(new CreateReview(review));
  }

  @Effect({dispatch: false})
  createReview$ = this.actions$
    .pipe(
      ofType(ReviewActionTypes.CreateReview),
      withLatestFrom(this.userFacade.user$),
      mergeMap((args: any[]) => {
        const action: any = args[0];
        const user: any = args[1];
        const review = action.payload;
        if (!user) {
          return of(EMPTY);
        }
        return this.apolloService.apolloClient.mutate({
          mutation: CreateReviewMutation,
          variables: review,
          optimisticResponse: {
            __typename: 'Mutation',
            createReview: {
              __typename: 'Review',
              id: `-${uuid()}`,
              ...review,
              userId: user.id,
              user,
            },
          },
          update: (store, { data: { createReview } }) => {
            this.selectReview(createReview);
            this.addToReviews(store, createReview);
            this.updateIdeas(store, createReview);
          },
        });
      })
    );

  updateReview(review: any) {
    this.store.dispatch(new UpdateReview(review));
  }

  @Effect({dispatch: false})
  updateReview$ = this.actions$
    .pipe(
      ofType(ReviewActionTypes.UpdateReview),
      withLatestFrom(this.userFacade.user$),
      mergeMap((args: any[]) => {
        const action: any = args[0];
        const user: any = args[1];
        const review = action.payload;
        if (!user) {
          return of(EMPTY);
        }
        return this.apolloService.apolloClient.mutate({
          mutation: UpdateReviewMutation,
          variables: review,
          optimisticResponse: {
            __typename: 'Mutation',
            updateReview: {
              __typename: 'Review',
              id: `-${uuid()}`,
              ...review,
              userId: user.id,
              user,
            },
          },
          update: (store, { data: { updateReview } }) => {
            this.selectReview(updateReview);
            this.updateReviews(store, updateReview);
            this.updateIdeas(store, updateReview);
          },
        });
      })
    );

  addToReviews(store: any, createdReview: any) {
    if (!createdReview || !createdReview.id) {
      return;
    }
    const query: any = store.readQuery({
      query: GetReviews,
      variables: { ideaId: createdReview.ideaId },
    });
    query.reviews.push(createdReview);
    store.writeQuery({
      query: GetReviews,
      variables: { ideaId: createdReview.ideaId },
      data: { reviews: query.reviews },
    });
  }

  updateReviews(store: any, updatedReview: any) {
    if (!updatedReview || !updatedReview.id) {
      return;
    }
    const query: any = store.readQuery({
      query: GetReviews,
      variables: { ideaId: updatedReview.ideaId },
    });
    const reviews: any[] = query.reviews.map((review: any) => review.id === review.id ? updatedReview : review);
    store.writeQuery({
      query: GetReviews,
      variables: { ideaId: updatedReview.ideaId },
      data: { reviews },
    });
  }

  updateIdeas(store: any, review: any) {
    if (!review || !review.id) {
      return;
    }
    const reviewsQuery: any = store.readQuery({
      query: GetReviews,
      variables: { ideaId: review.ideaId },
    });
    const averageRequiredAge = Math.round(meanBy(reviewsQuery.reviews, (review) => review.requiredAge));
    const averageScore = Math.round(meanBy(reviewsQuery.reviews, (review) => review.score));

    const ideasQuery: any = store.readQuery({
      query: GetIdeas,
    });
    const ideas: any[] = ideasQuery.ideas.map((idea: any) => idea.id === review.ideaId ? {
      ...idea,
      requiredAge: averageRequiredAge,
      score: averageScore,
    } : idea);
    store.writeQuery({
      query: GetIdeas,
      data: { ideas },
    });
  }
}
