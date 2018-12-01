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
  UpdateIdeaMutation,
  GetIdeas
} from '../../../graphql';

@Component({
  selector: 'app-idea-show-cmp',
  templateUrl: './idea-show.component.html',
  styleUrls: ['./idea-show.component.scss']
})
export class IdeaShowComponent implements OnInit, OnChanges {
  @Input('idea') idea: any;
  @ViewChild('labelElement') labelElement: any;
  @ViewChild('requiredAgeExplanationElement') requiredAgeExplanationElement: any;
  @ViewChild('scoreExplanationElement') scoreExplanationElement: any;
  formGroup: FormGroup;
  loading: boolean;
  ages: number[] = [];
  scores: number[] = [];

  constructor(private apollo: Apollo) {
    this.idea = {};
    this.formGroup = new FormGroup({
      id: new FormControl('', [Validators.required]),
      label: new FormControl('', []),
      requiredAge: new FormControl('', []),
      requiredAgeExplanation: new FormControl('', []),
      score: new FormControl('', []),
      scoreExplanation: new FormControl('', [])
    });
    this.formGroup.setValue({
      id: null,
      label: '',
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
      this.labelElement,
      this.requiredAgeExplanationElement,
      this.scoreExplanationElement,
    ];
    for (let element of elements) {
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
    if (!isEmpty(this.idea)) {
      this.formGroup.setValue({
        id: this.idea.id,
        label: this.idea.label,
        requiredAge: this.idea.requiredAge,
        requiredAgeExplanation: this.idea.requiredAgeExplanation,
        score: this.idea.score,
        scoreExplanation: this.idea.scoreExplanation,
      });
    }
  }

  save() {
    if (!this.formGroup.valid) {
      return;
    }
    const data = clone(this.formGroup.value);
    this.apollo.mutate({
      mutation: UpdateIdeaMutation,
      variables: data,
      refetchQueries: [{
        query: GetIdeas,
        variables: {
          buildId: this.idea.buildId
        }
      }]
    }).subscribe();
  }
}
