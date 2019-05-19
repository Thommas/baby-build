/**
 * Path of child
 *
 * Component - Idea - List
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, concat } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap, mergeMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
  CreateSharingMutation,
  DeleteSharingMutation,
  GetSharings,
  GetUsers
} from '../../../graphql';

@Component({
  selector: 'app-user-sharing-cmp',
  templateUrl: './user-sharing.component.html',
  styleUrls: ['./user-sharing.component.scss']
})
export class UserSharingComponent implements OnInit {
  @ViewChild('inputElement') inputElement: any;
  users$: Observable<any>;
  loading: boolean;
  sharings: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.users$ = fromEvent(this.inputElement.nativeElement, 'input').pipe(
      map((e: { target: HTMLInputElement }) => e.target.value),
      filter((value: string) => value.length > 2),
      debounceTime(800),
      distinctUntilChanged(),
      mergeMap((value: any) => {
        return this.apollo.watchQuery<any>({
          query: GetUsers,
          variables: {
            searchQuery: value,
          },
        }).valueChanges;
      }),
      map((res: any) => res.data.users),
    );
    this.getSharings();
  }

  getSharings() {
    this.loading = true;

    this.apollo.watchQuery<any>({
      query: GetSharings,
    })
      .valueChanges
      .subscribe(
        ({ data, loading }) => {
          this.loading = loading;
          this.sharings = data.sharings;
        },
        (e) => console.log('error while loading sharings', e)
      );
  }

  deleteSharing(sharingId: string) {
    this.apollo.mutate({
      mutation: DeleteSharingMutation,
      variables: {
        id: sharingId
      },
      update: (store, { data: { deleteSharing } }) => {
        if (!deleteSharing) {
          return;
        }
        const query: any = store.readQuery({ query: GetSharings });
        const sharings: any[] = query.sharings.filter((sharing: any) => sharing.id !== deleteSharing.id);
        store.writeQuery({ query: GetSharings, data: { sharings }});
      }
    }).subscribe();
  }

  optionSelected(option: any) {
    const userId: string = option.option.value;
    this.apollo.mutate({
      mutation: CreateSharingMutation,
      variables: {
        userId,
      },
    }).subscribe();
  }
}
