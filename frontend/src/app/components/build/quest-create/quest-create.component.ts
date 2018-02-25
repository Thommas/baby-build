/**
 * Path of child
 *
 * Component - Quest - Create
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const createQuestMutation = gql`
  mutation CreateQuest(
    $title: String!
    $build_id: String!
  ) {
    createQuest(
      title: $title
      build_id: $build_id
    ) {
      id
    }
  }
`;

@Component({
  selector: 'app-quest-create-cmp',
  templateUrl: './quest-create.component.html',
  styleUrls: ['./quest-create.component.scss']
})
export class QuestCreateComponent implements OnInit {
  quest: any;
  buildId: number;
  loading: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {
    this.quest = {};
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.buildId = params.id;
    });
  }

  submit() {
    let quest = clone(this.quest);
    quest.build_id = this.buildId;
    this.apollo.mutate({
      mutation: createQuestMutation,
      variables: {
        ...quest
      }
    }).subscribe(
      res => this.router.navigate(['/build/' + this.buildId])
    );
  }
}
