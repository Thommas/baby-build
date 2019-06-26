/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import uuid from 'uuid/v4';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { flatMap, pluck } from 'rxjs/operators';
import { CreateIdeaTagMutation, GetIdeaTags } from '../graphql';
import { IdeaFacade } from './idea.facade';

@Injectable()
export class IdeaTagFacade {
  ideaTags$;

  constructor(
    private apollo: Apollo,
    private ideaFacade: IdeaFacade
  ) {
    this.ideaTags$ = this.ideaFacade.selectedIdea$.pipe(
      flatMap((selectedIdea: any) => {
        if (!selectedIdea) {
          return of([]);
        }
  
        return this.apollo.watchQuery<any>({
          query: GetIdeaTags,
          variables: {
            ideaId: selectedIdea.id,
          }
        })
          .valueChanges
          .pipe(
            pluck('data', 'ideaTags')
          )
      })
    );
  }

  createIdeaTag(tag: any) {
    this.ideaFacade.selectedIdea$.pipe(
      flatMap((selectedIdea: any) => {
        return this.apollo.mutate({
          mutation: CreateIdeaTagMutation,
          variables: {
            ideaId: selectedIdea.id,
            tagId: tag.id,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createIdeaTag: {
              __typename: 'IdeaTag',
              id: -uuid(),
              tag: {
                __typename: 'Tag',
                label: tag.label,
              },
              // userId: user.id,
            },
          },
          update: (store, { data: { createIdeaTag } }) => {
            if (!createIdeaTag) {
              return;
            }
            const query: any = store.readQuery({
              query: GetIdeaTags,
              variables: {
                ideaId: selectedIdea.id,
              }
            });
            store.writeQuery({
              query: GetIdeaTags,
              variables: {
                ideaId: selectedIdea.id,
              },
              data: { ideaTags: [...query.ideaTags, createIdeaTag] }
            });
          }
        });
      })
    ).subscribe();
  }
}
