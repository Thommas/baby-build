/**
 * Path of child
 *
 * Component - Review - Show
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-review-show-cmp',
  templateUrl: './review-show.component.html',
  styleUrls: ['./review-show.component.scss']
})
export class ReviewShowComponent implements OnChanges {
  @Input() idea: any;
  selectedReview: any;

  constructor() {
    this.selectedReview = null;
  }

  ngOnChanges() {
    this.selectedReview = null;
  }

  selectedReviewChange(selectedReview: any) {
    this.selectedReview = selectedReview;
    console.log('selectedReview', selectedReview);
  }
}
