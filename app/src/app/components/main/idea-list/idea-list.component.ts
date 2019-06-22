/**
 * Path of child
 *
 * Component - Idea - List
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { GetIdeas, CreateIdeaMutation } from '../../../graphql';

@Component({
  selector: 'app-idea-list-cmp',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.scss']
})
export class IdeaListComponent implements OnInit, OnChanges {
  @Input() displayFilters: boolean;
  @Input() buildId: string;
  @Output() selectIdea: EventEmitter<any> = new EventEmitter<any>();
  filters$: any;
  loading: boolean;
  ideas: any;

  constructor(
    private apollo: Apollo,
    private store: Store<{ ideaFilters: any }>
  ) {
    this.buildId = null;
    this.filters$ = store.pipe(select('ideaFilters'));
  }

  ngOnInit() {
    this.getIdeas();
  }

  ngOnChanges() {
    this.getIdeas();
  }

  getIdeas() {
    this.loading = true;

    // this.filters$.pipe(map((filters: any) => {
    //   const currentFilters = Object.assign({}, filters);
    //   if (!currentFilters.requiredAge || 0 === currentFilters.requiredAge.length) {
    //     delete currentFilters.requiredAge;
    //   }
    //   if (!currentFilters.score || 0 === currentFilters.score.length) {
    //     delete currentFilters.score;
    //   }
    //   if (!currentFilters.tagId) {
    //     delete currentFilters.tagId;
    //   }
    //   if (!currentFilters.name) {
    //     delete currentFilters.name;
    //   }

    //   this.apollo.watchQuery<any>({
    //     query: GetIdeas,
    //     variables: currentFilters,
    //   })
    //     .valueChanges
    //     .subscribe(
    //       ({ data, loading }) => {
    //         this.loading = loading;
    //         this.ideas = data.ideas;
    //       },
    //       (e) => console.log('error while loading ideas', e)
    //     );
    // })).subscribe();
  }
}
