/**
 * Path of child
 *
 * Component - Tag List
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Apollo } from 'apollo-angular';
import { GetTags } from '../../../graphql';
import { IdeaFiltersFacade } from '../../../facade';

@Component({
  selector: 'app-tag-list-cmp',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
  filters$ = this.ideaFiltersFacade.filters$;
  loading: boolean;
  tags: any;

  constructor(
    private apollo: Apollo,
    private ideaFiltersFacade: IdeaFiltersFacade
  ) {
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

  selectTag(tag?: any) {
    this.ideaFiltersFacade.selectTag(tag);
  }
}
