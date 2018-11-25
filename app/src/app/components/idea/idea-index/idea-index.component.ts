/**
 * Path of child
 *
 * Component - Idea - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import swal from 'sweetalert2';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { GetIdeas, CreateIdeaMutation } from '../../../graphql';
import { UserService } from '../../../services';

@Component({
  selector: 'app-idea-index-cmp',
  templateUrl: './idea-index.component.html',
  styleUrls: ['./idea-index.component.scss']
})
export class IdeaIndexComponent {
  loading: boolean;
  selectedIdea: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.selectedIdea = null;
  }

  addIdea() {
    const idea = {};
    this.apollo.mutate({
      mutation: CreateIdeaMutation,
      variables: {
      },
      refetchQueries: [{
        query: GetIdeas,
        variables: {
        }
      }]
    }).subscribe();
  }

  selectIdea(idea) {
    this.selectedIdea = idea;
  }
}
