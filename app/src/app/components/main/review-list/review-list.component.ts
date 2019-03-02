/**
 * Path of child
 *
 * Component - Review - List
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GetReviews } from '../../../graphql';

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
  selectedReview: any;

  constructor(private apollo: Apollo) {
    this.reviews = [];
    this.selectedReview = null;
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

    this.apollo.watchQuery<any>({
      query: GetReviews,
      variables: {
        ideaId: this.idea.id,
      },
    })
      .valueChanges
      .subscribe(
        ({ data, loading }) => {
          this.loading = loading;
          this.reviews = data.reviews;
        },
        (e) => console.log('error while loading reviews', e)
      );
  }
}
