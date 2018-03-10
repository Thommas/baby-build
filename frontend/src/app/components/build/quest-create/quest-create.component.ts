/**
 * Path of child
 *
 * Component - Quest - Create
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { CreateQuestMutation } from '../../../graphql';
import { BuildService } from '../../../services';

@Component({
  selector: 'app-quest-create-cmp',
  templateUrl: './quest-create.component.html',
  styleUrls: ['./quest-create.component.scss']
})
export class QuestCreateComponent {
  quest: any;
  loading: boolean;

  constructor(
    private apollo: Apollo,
    public buildService: BuildService,
    private router: Router
  ) {
    this.quest = {};
  }

  submit() {
    const quest = clone(this.quest);
    quest.build_id = this.buildService.build.id;
    this.apollo.mutate({
      mutation: CreateQuestMutation,
      variables: {
        ...quest
      }
    }).subscribe(
      res => this.router.navigate(['/build/' + this.buildService.build.id])
    );
  }
}
