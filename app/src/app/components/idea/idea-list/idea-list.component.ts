/**
 * Path of child
 *
 * Component - Idea - List
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import swal from 'sweetalert2';
import { clone } from 'lodash';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { GetIdeas, CreateIdeaMutation } from '../../../graphql';
import { UserService } from '../../../services';

@Component({
  selector: 'app-idea-list-cmp',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.scss']
})
export class IdeaListComponent implements OnInit, OnChanges {
  @Input('buildId') buildId: string;
  @Output() selectIdea: EventEmitter<any> = new EventEmitter<any>();
  loading: boolean;
  ideas: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.buildId = null;
  }

  ngOnInit() {
    this.getIdeas();
  }

  ngOnChanges() {
    this.getIdeas();
  }

  getIdeas() {
    this.loading = true;

    this.apollo.watchQuery<any>({
      query: GetIdeas,
      variables: {}
    })
      .valueChanges
      .subscribe(
        ({ data, loading }) => {
          this.loading = loading;
          this.ideas = data.ideas;
        },
        (e) => console.log('error while loading ideas', e)
      );
  }
}
