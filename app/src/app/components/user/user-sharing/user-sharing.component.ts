/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { UserFacade } from '../../../facade';

@Component({
  selector: 'app-user-sharing-cmp',
  templateUrl: './user-sharing.component.html',
  styleUrls: ['./user-sharing.component.scss']
})
export class UserSharingComponent implements OnInit {
  @ViewChild('inputElement') inputElement: any;
  users$: Observable<any>;
  sharings: any;

  constructor(
    private apollo: Apollo,
    private userFacade: UserFacade
  ) {}

  ngOnInit() {
    this.users$ = fromEvent(this.inputElement.nativeElement, 'input').pipe(
      map((e: { target: HTMLInputElement }) => e.target.value),
      filter((value: string) => value.length > 2),
      debounceTime(800),
      distinctUntilChanged(),
      mergeMap((value: any) => {
        return this.userFacade.getUsersBySearchQuery(value);
      }),
      map((res: any) => res.data.users),
    );
    this.getSharings();
  }

  getSharings() {
    // this.apollo.watchQuery<any>({
    //   query: GetSharings,
    // })
    //   .valueChanges
    //   .subscribe(
    //     ({ data, loading }) => {
    //       this.loading = loading;
    //       this.sharings = data.sharings;
    //     },
    //     (e) => console.log('error while loading sharings', e)
    //   );
  }

  deleteSharing(sharingId: string) {
    // this.apollo.mutate({
    //   mutation: DeleteSharingMutation,
    //   variables: {
    //     id: sharingId
    //   },
    //   update: (store, { data: { deleteSharing } }) => {
    //     if (!deleteSharing) {
    //       return;
    //     }
    //     const query: any = store.readQuery({ query: GetSharings });
    //     const sharings: any[] = query.sharings.filter((sharing: any) => sharing.id !== deleteSharing.id);
    //     store.writeQuery({ query: GetSharings, data: { sharings }});
    //   }
    // }).subscribe();
  }

  optionSelected(option: any) {
    // const userId: string = option.option.value;
    // this.apollo.mutate({
    //   mutation: CreateSharingMutation,
    //   variables: {
    //     userId,
    //   },
    // }).subscribe();
  }
}
