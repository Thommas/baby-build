/**
 * Path of child
 *
 * Component - Review - Show
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import uuid from 'uuid/v4';
import { clone, isEmpty } from 'lodash';
import { Component, Inject, OnInit, OnChanges, Input, ViewChild, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
  GetIdeas,
  CreateReviewMutation,
  UpdateReviewMutation
} from '../../../graphql';

@Component({
  selector: 'app-review-show-cmp',
  templateUrl: './review-show.component.html',
  styleUrls: ['./review-show.component.scss']
})
export class ReviewShowComponent implements OnInit, OnChanges {
  @Input() idea: any;
  @Input() review: any;
  @ViewChild('requiredAgeExplanationElement') requiredAgeExplanationElement: any;
  @ViewChild('scoreExplanationElement') scoreExplanationElement: any;
  formGroup: FormGroup;
  loading: boolean;
  ages: number[] = [];
  scores: number[] = [];

  constructor(private apollo: Apollo) {
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
    const data: any = clone(this.formGroup.value);
    this.apollo.mutate({
      mutation: data.id ? UpdateReviewMutation : CreateReviewMutation,
      variables: data,
      optimisticResponse: {
        __typename: 'Mutation',
        [data.id ? 'updateReview' : 'createReview']: {
          __typename: 'Review',
          id: -uuid(),
          ...data
        },
      },
      update: (store, { data: { createReview, updateReview } }) => {
        if (!createReview && !updateReview) {
          return;
        }
        const review: any = createReview ? createReview : updateReview;
        Object.assign(review, data);
        const query: any = store.readQuery({ query: GetIdeas });
        const updatedIdeas: any[] = query.ideas.map((idea: any) => idea.id === data.ideaId ? {
          ...idea,
          // loggedReview: review,
        } : idea);
        store.writeQuery({ query: GetIdeas, data: { ideas: updatedIdeas }});
        this.review = review;
      },
    }).subscribe();
  }
}
