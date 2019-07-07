/**
 * Path of child
 *
 * Component - Review - List
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { ReviewFacade } from '../../../facade';

@Component({
  selector: 'app-review-list-cmp',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent {
  reviews$ = this.reviewFacade.reviews$;
  loggedUserReview$ = this.reviewFacade.loggedUserReview$;

  constructor(private reviewFacade: ReviewFacade) {
  }

  selectReview(review: any) {
    this.reviewFacade.selectReview(review);
  }
}
