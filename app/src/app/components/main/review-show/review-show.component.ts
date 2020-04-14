/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { ReviewFacade } from '../../../facade';

@Component({
  selector: 'app-review-show-cmp',
  templateUrl: './review-show.component.html',
  styleUrls: ['./review-show.component.scss']
})
export class ReviewShowComponent {
  selectedReview$ = this.reviewFacade.selectedReview$;

  constructor(private reviewFacade: ReviewFacade) {
  }
}
