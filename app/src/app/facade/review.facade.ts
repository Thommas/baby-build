/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import uuid from 'uuid/v4';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap, map, withLatestFrom, mergeMap } from 'rxjs/operators';
import {
  CreateReviewMutation,
  GetReviews,
  UpdateReviewMutation
} from '../graphql';
import { ApolloService } from '../services';
import {
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

  selectReview(idea: any) {
    this.store.dispatch(new SelectReview(idea));
  }

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
          mutation: review.id ? UpdateReviewMutation : CreateReviewMutation,
          variables: review,
          optimisticResponse: {
            __typename: 'Mutation',
            [review.id ? 'updateReview' : 'createReview']: {
              __typename: 'Review',
              id: `-${uuid()}`,
              ...review,
              userId: user.id,
              user,
            },
          },
          update: (store, { data: { createReview, updateReview } }) => {
            if (!createReview && !updateReview) {
              return;
            }
            const updatedReview: any = createReview ? createReview : updateReview;
            if (!updatedReview.id) {
              return;
            }
            this.updateReviews(store, review, updatedReview);
            this.updateIdeas(store, review, updatedReview);
          },
        });
      })
    );

  updateReviews(store: any, review: any, updatedReview) {
    const query: any = store.readQuery({
      query: GetReviews,
      variables: { ideaId: review.ideaId },
    });
    const reviews: any[] = query.reviews.map((review: any) => review.id === review.id ? updatedReview : review);
    store.writeQuery({
      query: GetReviews,
      variables: { ideaId: review.ideaId },
      data: { reviews },
    });
    // this.review = updatedReview;
    // this.formGroup.patchValue({
    //   id: this.review.id,
    //   requiredAge: this.review.requiredAge,
    //   requiredAgeExplanation: this.review.requiredAgeExplanation,
    //   score: this.review.score,
    //   scoreExplanation: this.review.scoreExplanation,
    //   ideaId: this.review.ideaId,
    // });
  }

  updateIdeas(store: any, data: any, updatedReview: any) {
    console.log('Update idea in store');
    // store.writeQuery({
    //   query: GetReviews,
    //   variables: { ideaId: this.review.ideaId },
    //   data: { reviews },
    // });
  }
}
