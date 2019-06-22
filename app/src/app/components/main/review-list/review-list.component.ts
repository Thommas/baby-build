/**
 * Path of child
 *
 * Component - Review - List
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { GetReviews } from '../../../graphql';
import { UserFacade } from '../../../facade';

@Component({
  selector: 'app-review-list-cmp',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit, OnChanges {
  @Input() idea: any;
  @Output() selectedReviewChange: EventEmitter<any> = new EventEmitter<any>();
  loading: boolean;
  reviews: any;
  loggedUserReview: any;
  selectedReview: any;

  constructor(private apollo: Apollo, private userFacade: UserFacade) {
    this.reviews = [];
    this.selectedReview = null;
    this.reviews = [];
    this.loggedUserReview = null;
  }

  ngOnInit() {
    this.getIdeas();
  }

  ngOnChanges() {
    this.getIdeas();
  }

  selectReview(review: any) {
    this.selectedReviewChange.emit(review);
    this.selectedReview = review;
  }

  getIdeas() {
    this.loading = true;

    // this.userFacade.user$.pipe(
    //   map((user: any) => {
    //     this.apollo.watchQuery<any>({
    //       query: GetReviews,
    //       variables: {
    //         ideaId: this.idea.id,
    //       },
    //     })
    //       .valueChanges
    //       .subscribe(
    //         ({ data, loading }) => {
    //           this.loading = loading;
    //           this.reviews = data.reviews.filter((review: any) => review.userId !== user.id);
    //           this.loggedUserReview = data.reviews.find((review: any) => review.userId === user.id);
    //           if (!this.loggedUserReview) {
    //             this.loggedUserReview = {
    //               user,
    //               userId: user.id,
    //               ideaId: this.idea.id,
    //             };
    //           }
    //           this.selectReview(this.loggedUserReview);
    //         },
    //         (e) => console.log('error while loading reviews', e)
    //       );
    //     }),
    //   ).subscribe();
  }
}
