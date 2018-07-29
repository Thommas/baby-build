/**
 * Path of child
 *
 * Component - Skill - Show
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
  UpdateSkillMutation,
  GetSkills
} from '../../../graphql';

@Component({
  selector: 'app-skill-show-cmp',
  templateUrl: './skill-show.component.html',
  styleUrls: ['./skill-show.component.scss']
})
export class SkillShowComponent implements OnChanges {
  @Input('skill') skill: any;
  @ViewChild('labelElement') labelElement: any;
  @ViewChild('descriptionElement') descriptionElement: any;
  formGroup: FormGroup;
  loading: boolean;

  constructor(private apollo: Apollo) {
    this.skill = {};
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
    if (!isEmpty(this.skill)) {
      this.formGroup.setValue({
        id: this.skill.id,
        label: this.skill.label,
        description: this.skill.description
      });
    }
  }

  save() {
    if (!this.formGroup.valid) {
      return;
    }
    const data = clone(this.formGroup.value);
    this.apollo.mutate({
      mutation: UpdateSkillMutation,
      variables: data,
      refetchQueries: [{
        query: GetSkills,
        variables: {
          buildId: this.skill.buildId
        }
      }]
    }).subscribe();
  }

  addLvl() {
    this.apollo.mutate({
      mutation: CreateLvlMutation,
      variables: {
        skillId: this.skill.id
      }
    }).subscribe();
  }
}
