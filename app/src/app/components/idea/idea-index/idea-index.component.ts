/**
 * Path of child
 *
 * Component - Idea - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import uuid from 'uuid/v4';
import swal from 'sweetalert2';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { GetIdeas, CreateIdeaMutation } from '../../../graphql';
import { UserService } from '../../../services';

@Component({
  selector: 'app-idea-index-cmp',
  templateUrl: './idea-index.component.html',
  styleUrls: ['./idea-index.component.scss']
})
export class IdeaIndexComponent {
  loading: boolean;
  selectedIdea: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.selectedIdea = null;
  }

  addIdea() {
    const idea = {};
    this.apollo.mutate({
      mutation: CreateIdeaMutation,
      optimisticResponse: {
        __typename: 'Mutation',
        createIdea: {
          __typename: 'Idea',
          id: -uuid(),
          label: '',
        },
      },
      update: (store, { data: { createIdea } }) => {
        const data: any = store.readQuery({ query: GetIdeas });
        data.ideas.unshift(createIdea);
        store.writeQuery({ query: GetIdeas, data });
      },
      refetchQueries: [{
        query: GetIdeas,
      }]
    }).subscribe();
  }

  selectIdea(idea) {
    this.selectedIdea = idea;
  }
}
