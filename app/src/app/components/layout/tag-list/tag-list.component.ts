/**
 * Path of child
 *
 * Component - TagList
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Apollo } from 'apollo-angular';
import { GetTags } from '../../../graphql';
import { Update } from '../../../store/idea-filters/idea-filters.actions';
import { ideaFiltersReducer } from '../../../store';

@Component({
  selector: 'app-tag-list-cmp',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
  filters$: any;
  loading: boolean;
  tags: any;

  constructor(
    private apollo: Apollo,
    private store: Store<{ ideaFilters: any }>
  ) {
    this.filters$ = store.pipe(select('ideaFilters'));
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
    this.store.dispatch(new Update({
      tagId: tag ? tag.id : null,
    }));
  }
}
