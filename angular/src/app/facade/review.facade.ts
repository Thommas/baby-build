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
import { IdeaFiltersFacade } from './idea-filters.facade';
import { UserFacade } from './user.facade';

@Injectable()
export class ReviewFacade {
  reviews$: Observable<any> = this.ideaFacade.selectedIdea$.pipe(
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
  loggedUserReview$: Observable<any> = this.ideaFacade.selectedIdea$.pipe(
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
                    id: null,
                    user,
                    userId: user.id,
                    ideaId: selectedIdea.id,
                    requiredAge: null,
                    requiredAgeExplanation: null,
                    score: null,
                    scoreExplanation: null,
                    __typename: "Review",
                  };
                }
                this.selectReview(loggedUserReview);
                return loggedUserReview;
              })
            );
          }),
      );
    }),
  );
  selectedReview$ = this.store.pipe(select('review', 'selected'));

  constructor(
    private actions$: Actions,
    private apolloService: ApolloService,
    private ideaFacade: IdeaFacade,
    private ideaFiltersFacade: IdeaFiltersFacade,
    private userFacade: UserFacade,
    private store: Store<{ review: any }>
  ) {
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
      withLatestFrom(
        this.userFacade.user$,
        this.ideaFiltersFacade.filters$
      ),
      mergeMap((args: any[]) => {
        const action: any = args[0];
        const user: any = args[1];
        const filters: any = args[2];
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
              ...review,
              __typename: 'Review',
              id: `-${uuid()}`,
              userId: user.id,
              user,
            },
          },
          update: (store, { data: { createReview } }) => {
            this.selectReview(createReview);
            this.addToReviews(store, createReview);
            this.updateIdea(store, createReview, filters);
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
      withLatestFrom(
        this.userFacade.user$,
        this.ideaFiltersFacade.filters$
      ),
      mergeMap((args: any[]) => {
        const action: any = args[0];
        const user: any = args[1];
        const filters: any = args[2];
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
            this.updateIdea(store, updateReview, filters);
          },
        });
      })
    );

  addToReviews(store: any, createdReview: any) {
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

  updateIdea(store: any, review: any, filters: any) {
    const reviewsQuery: any = store.readQuery({
      query: GetReviews,
      variables: { ideaId: review.ideaId },
    });
    const averageRequiredAge = Math.round(meanBy(reviewsQuery.reviews, (review) => review.requiredAge));
    const averageScore = Math.round(meanBy(reviewsQuery.reviews, (review) => review.score));

    const ideasQuery: any = store.readQuery({
      query: GetIdeas,
      variables: this.ideaFacade.purifyFilters(filters),
    });
    const idea: any = ideasQuery.ideas.nodes.find((idea: any) => idea.id === review.ideaId);
    idea.requiredAge = averageRequiredAge;
    idea.score = averageScore;
    store.writeQuery({
      query: GetIdeas,
      variables: this.ideaFacade.purifyFilters(filters),
      data: { ideas: ideasQuery.ideas },
    });
  }
}
