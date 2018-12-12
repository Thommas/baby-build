/**
 * Path of child
 *
 * Component - Idea - Item
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone, isEmpty } from 'lodash';
import { Component, Input, ViewChild, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
  CreateIdeaMutation,
  UpdateIdeaMutation,
  DeleteIdeaMutation,
  GetIdeas
} from '../../../graphql';

@Component({
  selector: 'app-idea-item-cmp',
  templateUrl: './idea-item.component.html',
  styleUrls: ['./idea-item.component.scss']
})
export class IdeaItemComponent implements OnInit, OnChanges {
  @Input() idea: any;
  @ViewChild('inputElement') inputElement: any;
  formGroup: FormGroup;
  loading: boolean;
  emptyIdeaReadyForDeletion: boolean;

  constructor(private apollo: Apollo) {
    this.emptyIdeaReadyForDeletion = false;
    this.idea = {};
    this.formGroup = new FormGroup({
      id: new FormControl('', []),
      label: new FormControl('', [Validators.required])
    });
    this.formGroup.setValue({
      id: null,
      label: ''
    });
  }

  ngOnInit() {
    fromEvent(this.inputElement.nativeElement, 'input').pipe(
      map((e: { target: HTMLInputElement }) => e.target.value),
      debounceTime(800),
      distinctUntilChanged(),
    ).subscribe(data => this.save(data));
  }

  ngOnChanges() {
    if (!isEmpty(this.idea)) {
      this.formGroup.setValue({
        id: this.idea.id,
        label: this.idea.label
      });
      if (!this.idea.label || this.idea.label.length === 0) {
        this.emptyIdeaReadyForDeletion = true;
      }
    }

  }

  save(label: string) {
    if (!this.formGroup.valid || !this.idea.id) {
      return;
    }
    this.apollo.mutate({
      mutation: UpdateIdeaMutation,
      variables: {
        id: this.idea.id,
        label
      }
    }).subscribe();
  }

  onKey(event: KeyboardEvent) {
    if (!this.formGroup.get('label').value || this.formGroup.get('label').value.length === 0) {
      if (this.emptyIdeaReadyForDeletion) {
        this.delete();
      } else {
        this.emptyIdeaReadyForDeletion = true;
      }
    } else {
      this.emptyIdeaReadyForDeletion = false;
    }
  }

  delete() {
    this.apollo.mutate({
      mutation: DeleteIdeaMutation,
      variables: {
        id: this.idea.id
      },
      refetchQueries: [{
        query: GetIdeas,
        variables: {
          buildId: this.idea.buildId
        }
      }]
    }).subscribe();
  }
}
