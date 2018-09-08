/**
 * Path of child
 *
 * Component - Skill - Form
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
  CreateSkillMutation,
  UpdateSkillMutation,
  DeleteSkillMutation,
  GetSkills
} from '../../../graphql';

@Component({
  selector: 'app-skill-item-cmp',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.scss']
})
export class SkillItemComponent implements OnChanges {
  @Input() skill: any;
  @ViewChild('inputElement') inputElement: any;
  formGroup: FormGroup;
  loading: boolean;
  emptySkillReadyForDeletion: boolean;

  constructor(private apollo: Apollo) {
    this.emptySkillReadyForDeletion = false;
    this.skill = {};
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
    if (!isEmpty(this.skill)) {
      this.formGroup.setValue({
        id: this.skill.id,
        label: this.skill.label
      });
      if (!this.skill.label || this.skill.label.length === 0) {
        this.emptySkillReadyForDeletion = true;
      }
    }

  }

  save(label: string) {
    if (!this.formGroup.valid) {
      return;
    }
    this.apollo.mutate({
      mutation: this.skill.id ? UpdateSkillMutation : CreateSkillMutation,
      variables: {
        id: this.skill.id ? this.skill.id : undefined,
        label: label
      }
    }).subscribe();
  }

  onKey(event: KeyboardEvent) {
    if (!this.formGroup.get('label').value || this.formGroup.get('label').value.length === 0) {
      if (this.emptySkillReadyForDeletion) {
        this.delete();
      } else {
        this.emptySkillReadyForDeletion = true;
      }
    } else {
      this.emptySkillReadyForDeletion = false;
    }
  }

  delete() {
    this.apollo.mutate({
      mutation: DeleteSkillMutation,
      variables: {
        id: this.skill.id
      },
      refetchQueries: [{
        query: GetSkills,
        variables: {
          buildId: this.skill.buildId
        }
      }]
    }).subscribe();
  }
}
