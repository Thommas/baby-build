/**
 * Path of child
 *
 * Component - Quest - Form
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as moment from 'moment';
import { clone } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import {
  CreateQuestMutation,
  GetQuest,
  UpdateQuestMutation
} from '../../../graphql';
import { BuildService } from '../../../services';

@Component({
  selector: 'app-quest-form-cmp',
  templateUrl: './quest-form.component.html',
  styleUrls: ['./quest-form.component.scss']
})
export class QuestFormComponent implements OnInit {
  formGroup: FormGroup;
  loading: boolean;

  constructor(
    private apollo: Apollo,
    public buildService: BuildService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formGroup = new FormGroup({
      id: new FormControl('', []),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      option1: new FormControl('', []),
      option2: new FormControl('', []),
      option3: new FormControl('', []),
      type: new FormControl('', [Validators.required]),
    });
    this.formGroup.setValue({
      id: null,
      title: null,
      description: null,
      option1: null,
      option2: null,
      option3: null,
      type: 'main'
    });
  }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {
      if (!params.id) {
        this.loading = false;
        return;
      }

      this.apollo.watchQuery<any>({
        query: GetQuest,
        variables: {
          id: params.id
        }
      })
        .valueChanges
        .subscribe(({ data, loading }) => {
          this.loading = loading;
          this.formGroup.setValue({
            id: data.quest.id,
            title: data.quest.title,
            description: data.quest.description,
            option1: data.quest.option1,
            option2: data.quest.option2,
            option3: data.quest.option3,
            type: data.quest.type
          });
        });
    });
  }

  setQuestType(newType: string) {
    this.formGroup.patchValue({
      type: newType
    });
  }

  submit() {
    if (!this.formGroup.valid) {
      return;
    }
    const child = clone(this.formGroup.value);
    this.apollo.mutate({
      mutation: child.id ? UpdateQuestMutation : CreateQuestMutation,
      variables: {
        ...child
      }
    }).subscribe(
      res => this.router.navigate(['/calendar/show'])
    );
  }
}
