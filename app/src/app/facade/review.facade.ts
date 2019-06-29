/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { GetReviews } from '../graphql';
import { ApolloService } from '../services';
import { SelectReview } from '../store';
import { IdeaFacade } from './idea.facade';
import { UserFacade } from './user.facade';

@Injectable()
export class ReviewFacade {
  reviews$: Observable<any>;
  loggedUserReview$: Observable<any>;
  selectedReview$ = this.store.pipe(select('review', 'selected'));

  constructor(
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
}
