/**
 * Path of child
 *
 * Component - Idea Tag List
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import uuid from 'uuid/v4';
import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material';
import { fromEvent, Observable, concat } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap, mergeMap, flatMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { CreateIdeaTagMutation, GetIdeaTags, GetTags } from '../../../graphql';
import { UserFacade } from '../../../facade';

@Component({
  selector: 'app-idea-tag-list-cmp',
  templateUrl: './idea-tag-list.component.html',
  styleUrls: ['./idea-tag-list.component.scss']
})
export class IdeaTagListComponent implements OnInit, OnChanges {
  @ViewChild('inputElement') inputElement: any;
  tags$: Observable<any>;
  @Input() idea: any;
  loading: boolean;
  ideaTags: any;

  constructor(private apollo: Apollo, private userFacade: UserFacade) {
    this.ideaTags = [];
  }

  ngOnInit() {
    this.tags$ = fromEvent(this.inputElement.nativeElement, 'input').pipe(
      map((e: { target: HTMLInputElement }) => e.target.value),
      filter((value: string) => value.length > 2),
      debounceTime(800),
      distinctUntilChanged(),
      mergeMap((value: any) => {
        return this.apollo.watchQuery<any>({
          query: GetTags,
          variables: {
            label: value,
          },
        }).valueChanges;
      }),
      map((res: any) => res.data.tags),
    );
    this.getIdeaTags();
  }

  ngOnChanges() {
    this.getIdeaTags();
  }

  getIdeaTags() {
    this.loading = true;

    // this.userFacade.user$.pipe(
    //   map((user: any) => {
    //     this.apollo.watchQuery<any>({
    //       query: GetIdeaTags,
    //       variables: {
    //         ideaId: this.idea.id,
    //       },
    //     })
    //       .valueChanges
    //       .subscribe(
    //         ({ data, loading }) => {
    //           this.loading = loading;
    //           this.ideaTags = data.ideaTags;
    //         },
    //         (e) => console.log('error while loading reviews', e)
    //       );
    //     }),
    //   ).subscribe();
  }

  optionSelected(event: any) {
    this.inputElement.nativeElement.value = '';
    const tag: any = event.option.value;
    // this.userFacade.user$.pipe(
    //   flatMap((user: any) => {
    //     return this.apollo.mutate({
    //       mutation: CreateIdeaTagMutation,
    //       variables: {
    //         ideaId: this.idea.id,
    //         tagId: tag.id,
    //       },
    //       optimisticResponse: {
    //         __typename: 'Mutation',
    //         createIdeaTag: {
    //           __typename: 'IdeaTag',
    //           id: -uuid(),
    //           tag: {
    //             __typename: 'Tag',
    //             label: tag.label,
    //           },
    //           userId: user.id,
    //         },
    //       },
    //       update: (store, { data: { createIdeaTag } }) => {
    //         if (!createIdeaTag) {
    //           return;
    //         }
    //         const query: any = store.readQuery({
    //           query: GetIdeaTags,
    //           variables: {
    //             ideaId: this.idea.id,
    //           }
    //         });
    //         store.writeQuery({
    //           query: GetIdeaTags,
    //           variables: {
    //             ideaId: this.idea.id,
    //           },
    //           data: { ideaTags: [...query.ideaTags, createIdeaTag] }
    //         });
    //       }
    //     });
    //   })
    // ).subscribe();
  }
}
