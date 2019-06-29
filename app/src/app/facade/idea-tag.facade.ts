/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import uuid from 'uuid/v4';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { flatMap, pluck } from 'rxjs/operators';
import {
  CreateIdeaTagMutation,
  DeleteIdeaTagMutation,
  GetIdeaTags
} from '../graphql';
import { IdeaFacade } from './idea.facade';
import { UserFacade } from './user.facade';
import { ApolloService } from '../services';

@Injectable()
export class IdeaTagFacade {
  ideaTags$;

  constructor(
    private apolloService: ApolloService,
    private ideaFacade: IdeaFacade,
    private userFacade: UserFacade
  ) {
    this.ideaTags$ = this.ideaFacade.selectedIdea$.pipe(
      flatMap((selectedIdea: any) => {
        if (!selectedIdea) {
          return of([]);
        }

        return this.apolloService.apolloClient.watchQuery<any>({
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
    this.userFacade.user$.pipe(
      flatMap((user: any) => {
        return this.ideaFacade.selectedIdea$.pipe(
          flatMap((selectedIdea: any) => {
            return this.apolloService.apolloClient.mutate({
              mutation: CreateIdeaTagMutation,
              variables: {
                ideaId: selectedIdea.id,
                tagId: tag.id,
              },
              optimisticResponse: {
                __typename: 'Mutation',
                createIdeaTag: {
                  __typename: 'IdeaTag',
                  id: `-${uuid()}`,
                  tag: {
                    __typename: 'Tag',
                    label: tag.label,
                  },
                  userId: user.id,
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
        );
      })
    ).subscribe();
  }

  deleteIdeaTag(ideaTag: any, idea: any) {
    this.apolloService.apolloClient.mutate({
      mutation: DeleteIdeaTagMutation,
      variables: {
        id: ideaTag.id,
      },
      update: (store, { data: { deleteIdeaTag } }) => {
        if (!deleteIdeaTag) {
          return;
        }
        const query: any = store.readQuery({ query: GetIdeaTags, variables: { ideaId: idea.id } });
        const ideaTags: any[] = query.ideaTags.filter((ideaTag: any) => ideaTag.id !== deleteIdeaTag.id);
        store.writeQuery({ query: GetIdeaTags, variables: { ideaId: idea.id }, data: { ideaTags }});
      }
    }).subscribe();
  }
}
