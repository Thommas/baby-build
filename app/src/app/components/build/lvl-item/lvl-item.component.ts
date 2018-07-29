/**
 * Path of child
 *
 * Component - Lvl - Form
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone, isEmpty } from 'lodash';
import { Component, Input, ViewChild, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
  CreateLvlMutation,
  UpdateLvlMutation,
  DeleteLvlMutation,
  GetLvls
} from '../../../graphql';

@Component({
  selector: 'app-lvl-item-cmp',
  templateUrl: './lvl-item.component.html',
  styleUrls: ['./lvl-item.component.scss']
})
export class LvlItemComponent implements OnChanges {
  @Input() lvl: any;
  @ViewChild('inputElement') inputElement: any;
  formGroup: FormGroup;
  loading: boolean;
  emptyLvlReadyForDeletion: boolean;

  constructor(private apollo: Apollo) {
    this.emptyLvlReadyForDeletion = false;
    this.lvl = {};
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
    if (!isEmpty(this.lvl)) {
      this.formGroup.setValue({
        id: this.lvl.id,
        label: this.lvl.label
      });
      if (!this.lvl.label || this.lvl.label.length === 0) {
        this.emptyLvlReadyForDeletion = true;
      }
    }

  }

  save(label: string) {
    if (!this.formGroup.valid) {
      return;
    }
    this.apollo.mutate({
      mutation: this.lvl.id ? UpdateLvlMutation : CreateLvlMutation,
      variables: {
        id: this.lvl.id ? this.lvl.id : undefined,
        label: label
      }
    }).subscribe();
  }

  onKey(event: KeyboardEvent) {
    if (!this.formGroup.get('label').value || this.formGroup.get('label').value.length === 0) {
      if (this.emptyLvlReadyForDeletion) {
        this.delete();
      } else {
        this.emptyLvlReadyForDeletion = true;
      }
    } else {
      this.emptyLvlReadyForDeletion = false;
    }
  }

  delete() {
    this.apollo.mutate({
      mutation: DeleteLvlMutation,
      variables: {
        id: this.lvl.id
      },
      refetchQueries: [{
        query: GetLvls,
        variables: {
          skillId: this.lvl.skillId
        }
      }]
    }).subscribe();
  }
}
