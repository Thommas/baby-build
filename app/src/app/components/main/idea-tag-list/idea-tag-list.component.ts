/**
 * Path of child
 *
 * Component - Idea Tag List
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { fromEvent, Observable, concat } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap, mergeMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { CreateIdeaTagMutation, GetIdeaTags, GetTags } from '../../../graphql';
import { UserService } from '../../../services';

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

  constructor(private apollo: Apollo, private userService: UserService) {
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

    this.userService.user$.pipe(
      map((user: any) => {
        this.apollo.watchQuery<any>({
          query: GetIdeaTags,
          variables: {
            ideaId: this.idea.id,
          },
        })
          .valueChanges
          .subscribe(
            ({ data, loading }) => {
              this.loading = loading;
              this.ideaTags = data.ideaTags;
            },
            (e) => console.log('error while loading reviews', e)
          );
        }),
      ).subscribe();
  }

  optionSelected(option: any) {
    const tagId: string = option.option.value;
    this.apollo.mutate({
      mutation: CreateIdeaTagMutation,
      variables: {
        ideaId: this.idea.id,
        tagId,
      },
    }).subscribe();
  }
}
