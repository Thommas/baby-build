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
      description: new FormControl('', [])
    });
    this.formGroup.setValue({
      id: null,
      label: '',
      description: ''
    });
    for (let age = 1; age <= 20; age++) {
      this.ages.push(age);
    }
    for (let score = -5; score <= 5; score++) {
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

  ngOnChanges() {
    if (!isEmpty(this.idea)) {
      this.formGroup.setValue({
        id: this.idea.id,
        label: this.idea.label,
        required_age: this.idea.required_age,
        required_age_explanation: this.idea.required_age_explanation,
        score: this.idea.score,
        score_explanation: this.idea.score_explanation,
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
