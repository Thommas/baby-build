/**
 * Path of child
 *
 * Component - Review - List
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ReviewFacade } from '../../../facade';

@Component({
  selector: 'app-review-list-cmp',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent {
  @Input() idea: any;
  @Output() selectedReviewChange: EventEmitter<any> = new EventEmitter<any>();
  reviews$ = this.reviewFacade.reviews$;
  loggedUserReview$ = this.reviewFacade.loggedUserReview$;

  constructor(private apollo: Apollo, private reviewFacade: ReviewFacade) {
  }

  selectReview(review: any) {
    // FIXME
    // this.selectedReviewChange.emit(review);
    // this.selectedReview = review;
  }
}
