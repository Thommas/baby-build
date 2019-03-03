/**
 * Path of child
 *
 * Component - Idea - List
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Input, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GetSharings } from '../../../graphql';

@Component({
  selector: 'app-user-sharing-cmp',
  templateUrl: './user-sharing.component.html',
  styleUrls: ['./user-sharing.component.scss']
})
export class UserSharingComponent implements OnInit {
  loading: boolean;
  sharings: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
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
}
