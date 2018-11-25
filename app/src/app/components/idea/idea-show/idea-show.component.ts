/**
 * Path of child
 *
 * Component - Idea - Show
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone, isEmpty } from 'lodash';
import { Component, Inject, OnChanges, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
  CreateLvlMutation,
  UpdateIdeaMutation,
  GetIdeas
} from '../../../graphql';

@Component({
  selector: 'app-idea-show-cmp',
  templateUrl: './idea-show.component.html',
  styleUrls: ['./idea-show.component.scss']
})
export class IdeaShowComponent implements OnChanges {
  @Input('idea') idea: any;
  @ViewChild('labelElement') labelElement: any;
  @ViewChild('descriptionElement') descriptionElement: any;
  formGroup: FormGroup;
  loading: boolean;

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
  }

  ngOnInit() {
    fromEvent(this.labelElement.nativeElement, 'input').pipe(
      map((e: { target: HTMLInputElement }) => e.target.value),
      debounceTime(800),
      distinctUntilChanged(),
    ).subscribe(data => this.save());

    fromEvent(this.descriptionElement.nativeElement, 'input').pipe(
      map((e: { target: HTMLInputElement }) => e.target.value),
      debounceTime(800),
      distinctUntilChanged(),
    ).subscribe(data => this.save());
  }

  ngOnChanges() {
    if (!isEmpty(this.idea)) {
      this.formGroup.setValue({
        id: this.idea.id,
        label: this.idea.label,
        description: this.idea.description
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

  addLvl() {
    this.apollo.mutate({
      mutation: CreateLvlMutation,
      variables: {
        ideaId: this.idea.id
      }
    }).subscribe();
  }
}
