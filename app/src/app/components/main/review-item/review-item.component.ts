/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, OnInit, OnChanges, Input, ViewChild, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ReviewFacade } from '../../../facade';

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

  constructor(private reviewFacade: ReviewFacade) {
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
    const review: any = clone(this.formGroup.value);
    if (review.id) {
      this.reviewFacade.updateReview(review);
    } else {
      this.reviewFacade.createReview(review);
    }
  }
}
