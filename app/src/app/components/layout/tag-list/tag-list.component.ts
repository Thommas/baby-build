/**
 * Path of child
 *
 * Component - TagList
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GetTags } from '../../../graphql';

@Component({
  selector: 'app-tag-list-cmp',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
  loading: boolean;
  tags: any;

  constructor(private apollo: Apollo) {
    this.loading = false;
    this.tags = [];
  }

  ngOnInit() {
    this.getTags();
  }

  getTags() {
    this.loading = true;

    this.apollo.watchQuery<any>({
      query: GetTags,
    })
      .valueChanges
      .subscribe(
        ({ data, loading }) => {
          this.loading = loading;
          this.tags = data.tags;
        },
        (e) => console.log('error while loading tags', e)
      );
  }
}
