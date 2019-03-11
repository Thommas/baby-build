/**
 * Path of child
 *
 * Component - Idea Tag List
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { GetIdeaTags } from '../../../graphql';
import { UserService } from '../../../services';

@Component({
  selector: 'app-idea-tag-list-cmp',
  templateUrl: './idea-tag-list.component.html',
  styleUrls: ['./idea-tag-list.component.scss']
})
export class IdeaTagListComponent implements OnInit, OnChanges {
  @Input() idea: any;
  loading: boolean;
  ideaTags: any;

  constructor(private apollo: Apollo, private userService: UserService) {
    this.ideaTags = [];
  }

  ngOnInit() {
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
}
