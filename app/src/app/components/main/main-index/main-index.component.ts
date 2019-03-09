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
import { flatMap } from 'rxjs/operators';
import { GetIdeas, CreateIdeaMutation } from '../../../graphql';
import { UserService } from '../../../services';

@Component({
  selector: 'app-main-index-cmp',
  templateUrl: './main-index.component.html',
  styleUrls: ['./main-index.component.scss']
})
export class MainIndexComponent {
  loading: boolean;
  displayFilters: boolean;
  selectedIdea: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.displayFilters = false;
    this.selectedIdea = null;
  }

  addIdea() {
    this.userService.user$.pipe(
      flatMap((user: any) => {
        const idea = {};
        return this.apollo.mutate({
          mutation: CreateIdeaMutation,
          optimisticResponse: {
            __typename: 'Mutation',
            createIdea: {
              __typename: 'Idea',
              id: -uuid(),
              userId: user.id,
              label: null,
              icon: null,
              user,
            },
          },
          update: (store, { data: { createIdea } }) => {
            if (!createIdea) {
              return;
            }
            const data: any = store.readQuery({ query: GetIdeas });
            const updatedIdeas: any = data.ideas;
            updatedIdeas.unshift(createIdea);
            store.writeQuery({ query: GetIdeas, data: { ideas: updatedIdeas } });
          },
        });
      })
    ).subscribe();
  }

  selectIdea(idea: any) {
    this.selectedIdea = idea;
  }

  toggleFilters() {
    this.displayFilters = !this.displayFilters;
  }
}
