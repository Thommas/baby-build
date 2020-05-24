/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IdeaFacade, ReviewFacade } from '../../../facade';
import { FormService } from '../../../services';

@Component({
  selector: 'app-review-item-cmp',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss']
})
export class ReviewItemComponent implements OnInit, OnDestroy {
  @ViewChild('requiredAgeExplanationElement') requiredAgeExplanationElement: any;
  @ViewChild('scoreExplanationElement') scoreExplanationElement: any;
  formGroup: FormGroup;
  loading: boolean;
  subs: Subscription[] = [];

  constructor(
    private formService: FormService,
    public ideaFacade: IdeaFacade,
    private reviewFacade: ReviewFacade
  ) {
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
  }

  ngOnInit() {
    const elements = [
      this.requiredAgeExplanationElement,
      this.scoreExplanationElement,
    ];
    const operator = map((value: any) => this.save());
    for (const element of elements) {
      this.subs.push(this.formService.getFormFieldSubscription(element, operator));
    }
    this.reviewFacade.selectedReview$.pipe(
      tap(review => {
        if (review) {
          this.formGroup.patchValue(review);
        }
      }),
    ).subscribe();
  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
    this.subs = [];
  }

  selectRequiredAge(requiredAge: number) {
    this.formGroup.patchValue({
      requiredAge,
    });
    this.save();
  }

  selectScore(score: number) {
    this.formGroup.patchValue({
      score,
    });
    this.save();
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
