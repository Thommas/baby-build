/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import uuid from 'uuid/v4';
import { find } from 'lodash';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { flatMap, pluck, withLatestFrom, mergeMap } from 'rxjs/operators';
import {
  CreateIdeaTagMutation,
  DeleteIdeaTagMutation,
  GetIdeaTags
} from '../graphql';
import { IdeaFacade } from './idea.facade';
import { UserFacade } from './user.facade';
import { ApolloService } from '../services';
import {
  CreateIdeaTag,
  DeleteIdeaTag,
  IdeaTagActionTypes,
} from '../store';

@Injectable()
export class IdeaTagFacade {
  ideaTags$ = this.ideaFacade.selectedIdea$.pipe(
    flatMap((selectedIdea: any) => {
      console.log('INSIDE IDEA TAGS', selectedIdea);
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

  constructor(
    private actions$: Actions,
    private apolloService: ApolloService,
    private ideaFacade: IdeaFacade,
    private userFacade: UserFacade,
    private store: Store<{}>
  ) {
  }

  createIdeaTag(data: any) {
    this.store.dispatch(new CreateIdeaTag(data));
  }

  @Effect({ dispatch: false })
  createIdeaTag$ = this.actions$
    .pipe(
      ofType(IdeaTagActionTypes.CreateIdeaTag),
      withLatestFrom(
        this.userFacade.user$,
        this.ideaFacade.selectedIdea$,
        this.ideaTags$
      ),
      flatMap((args: any[]) => {
        const action: any = args[0];
        const tag = action.payload;
        const user: any = args[1];
        const selectedIdea: any = args[2];
        const ideaTags: any = args[3];
        if (!user || !selectedIdea) {
          return of(EMPTY);
        }
        if (find(ideaTags, ['tag.id', tag.id])) {
          return of(EMPTY);
        }
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

  deleteIdeaTag(ideaTag: any, idea: any) {
    this.store.dispatch(new DeleteIdeaTag({ ideaTag, idea }));
  }

  @Effect({dispatch: false})
  deleteIdeaTag$ = this.actions$
    .pipe(
      ofType(IdeaTagActionTypes.DeleteIdeaTag),
      mergeMap((action: any) => {
        const { ideaTag, idea } = action.payload;
        return this.apolloService.apolloClient.mutate({
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
        });
      })
    );
}
