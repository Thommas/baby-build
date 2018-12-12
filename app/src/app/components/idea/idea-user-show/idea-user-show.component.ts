/**
 * Path of child
 *
 * Component - Idea - Show
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone, isEmpty } from 'lodash';
import { Component, Inject, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
  UpdateIdeaUserMutation
} from '../../../graphql';

@Component({
  selector: 'app-idea-user-show-cmp',
  templateUrl: './idea-user-show.component.html',
  styleUrls: ['./idea-user-show.component.scss']
})
export class IdeaUserShowComponent implements OnInit, OnChanges {
  @Input('userIdea') userIdea: any;
  @ViewChild('requiredAgeExplanationElement') requiredAgeExplanationElement: any;
  @ViewChild('scoreExplanationElement') scoreExplanationElement: any;
  formGroup: FormGroup;
  loading: boolean;
  ages: number[] = [];
  scores: number[] = [];

  constructor(private apollo: Apollo) {
    this.userIdea = {};
    this.formGroup = new FormGroup({
      id: new FormControl('', [Validators.required]),
      requiredAge: new FormControl('', []),
      requiredAgeExplanation: new FormControl('', []),
      score: new FormControl('', []),
      scoreExplanation: new FormControl('', [])
    });
    this.formGroup.setValue({
      id: null,
      requiredAge: null,
      requiredAgeExplanation: '',
      score: null,
      scoreExplanation: ''
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

  ngOnChanges() {
    if (!isEmpty(this.userIdea)) {
      this.formGroup.setValue({
        id: this.userIdea.id,
        requiredAge: this.userIdea.requiredAge,
        requiredAgeExplanation: this.userIdea.requiredAgeExplanation,
        score: this.userIdea.score,
        scoreExplanation: this.userIdea.scoreExplanation,
      });
    } else {
      this.formGroup.setValue({
        id: null,
        requiredAge: null,
        requiredAgeExplanation: '',
        score: null,
        scoreExplanation: ''
      });
    }
  }

  save() {
    if (!this.formGroup.valid) {
      return;
    }
    const data = clone(this.formGroup.value);
    this.apollo.mutate({
      mutation: UpdateIdeaUserMutation,
      variables: data,
    }).subscribe();
  }
}
