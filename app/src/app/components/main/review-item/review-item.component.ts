/**
 * Path of child
 *
 * Component - Review - Item
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import uuid from 'uuid/v4';
import { clone, isEmpty } from 'lodash';
import { Component, Inject, OnInit, OnChanges, Input, ViewChild, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap, flatMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
  GetReviews,
  CreateReviewMutation,
  UpdateReviewMutation
} from '../../../graphql';
import { UserService } from '../../../services';

@Component({
  selector: 'app-review-item-cmp',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss']
})
export class ReviewItemComponent implements OnInit, OnChanges {
  @Input() review: any;
  @ViewChild('requiredAgeExplanationElement') requiredAgeExplanationElement: any;
  @ViewChild('scoreExplanationElement') scoreExplanationElement: any;
  formGroup: FormGroup;
  loading: boolean;
  ages: number[] = [];
  scores: number[] = [];

  constructor(private apollo: Apollo, private userService: UserService) {
    this.review = {};
    this.formGroup = new FormGroup({
      id: new FormControl('', []),
      requiredAge: new FormControl('', []),
      requiredAgeExplanation: new FormControl('', []),
      score: new FormControl('', []),
      scoreExplanation: new FormControl('', []),
      ideaId: new FormControl('', [Validators.required])
    });
    this.formGroup.setValue({
      id: null,
      requiredAge: null,
      requiredAgeExplanation: '',
      score: null,
      scoreExplanation: '',
      ideaId: null
    });
    for (let age = 1; age <= 20; age++) {
      this.ages.push(age);
    }
    for (let score = -3; score <= 3; score++) {
      this.scores.push(score);
    }
  }

  ngOnInit() {
    const elements = [
      this.requiredAgeExplanationElement,
      this.scoreExplanationElement,
    ];
    for (const element of elements) {
      fromEvent(element.nativeElement, 'input').pipe(
        map((e: { target: HTMLInputElement }) => e.target.value),
        debounceTime(800),
        distinctUntilChanged(),
      ).subscribe(data => this.save());
    }
  }

  selectRequiredAge(age: number) {
    this.formGroup.patchValue({
      requiredAge: age,
    });
    this.save();
  }

  selectScore(score: number) {
    this.formGroup.patchValue({
      score: score,
    });
    this.save();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.review && changes.review.previousValue
      && changes.idea && changes.idea.previousValue) {
      this.save();
    }
    if (changes.review) {
      const review: any = changes.review.currentValue;
      this.formGroup.patchValue({
        id: review ? review.id : null,
        requiredAge: review ? review.requiredAge : null,
        requiredAgeExplanation: review ? review.requiredAgeExplanation : null,
        score: review ? review.score : null,
        scoreExplanation: review ? review.scoreExplanation : null,
        ideaId: review ? review.ideaId : null,
      });
    }
    if (changes.idea && changes.idea.currentValue) {
      const idea: any = changes.idea.currentValue;
      this.formGroup.patchValue({
        ideaId: idea.id,
      });
    }
  }

  save() {
    if (!this.formGroup.valid) {
      return;
    }
    this.userService.user$.pipe(
      flatMap((user: any) => {
        const data: any = clone(this.formGroup.value);
        return this.apollo.mutate({
          mutation: data.id ? UpdateReviewMutation : CreateReviewMutation,
          variables: data,
          optimisticResponse: {
            __typename: 'Mutation',
            [data.id ? 'updateReview' : 'createReview']: {
              __typename: 'Review',
              id: -uuid(),
              ...data,
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
            const query: any = store.readQuery({
              query: GetReviews,
              variables: { ideaId: this.review.ideaId },
            });
            const reviews: any[] = query.reviews.map((review: any) => review.id === data.id ? updatedReview : review);
            store.writeQuery({
              query: GetReviews,
              variables: { ideaId: this.review.ideaId },
              data: { reviews },
            });
            this.review = updatedReview;
            this.formGroup.patchValue({
              id: this.review.id,
              requiredAge: this.review.requiredAge,
              requiredAgeExplanation: this.review.requiredAgeExplanation,
              score: this.review.score,
              scoreExplanation: this.review.scoreExplanation,
              ideaId: this.review.ideaId,
            });
          },
        });
      })
    ).subscribe();
  }
}
