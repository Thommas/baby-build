/**
 * Path of child
 *
 * Component - Idea - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import uuid from 'uuid/v4';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Apollo } from 'apollo-angular';
import { flatMap, map, take } from 'rxjs/operators';
import { GetIdeas, CreateIdeaMutation } from '../../../graphql';
import { UserFacade } from '../../../facade';
import { IdeaFiltersFacade } from '../../../facade';

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
    private apollo: Apollo,
    private userFacade: UserFacade,
    private ideaFiltersFacade: IdeaFiltersFacade
  ) {
    this.displayFilters = false;
    this.selectedIdea = null;
  }

  addIdea() {
    this.ideaFiltersFacade.reset();
    this.userFacade.user$.pipe(
      take(1),
      flatMap((user: any) => {
        return this.apollo.mutate({
          mutation: CreateIdeaMutation,
          optimisticResponse: {
            __typename: 'Mutation',
            createIdea: {
              __typename: 'Idea',
              id: -uuid(),
              label: null,
              icon: null,
              userId: user.id,
              user: {
                __typename: 'User',
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
              },
              requiredAge: 0,
              score: 0,
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
