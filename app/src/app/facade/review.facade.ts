/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { GetReviews } from '../graphql';
import { IdeaFacade } from './idea.facade';
import { UserFacade } from './user.facade';

@Injectable()
export class ReviewFacade {
  reviews$: Observable<any>;
  loggedUserReview$: Observable<any>;

  constructor(
    private apollo: Apollo,
    private ideaFacade: IdeaFacade,
    private userFacade: UserFacade
  ) {
    this.reviews$ = this.ideaFacade.selectedIdea$.pipe(
      flatMap((selectedIdea: any) => {
        return this.userFacade.user$.pipe(
          flatMap((user: any) => {
            return this.apollo.watchQuery<any>({
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
        return this.userFacade.user$.pipe(
          flatMap((user: any) => {
            return this.apollo.watchQuery<any>({
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
                  // this.selectReview(this.loggedUserReview);
                })
              );
            }),
        );
      }),
    );
  }
}
