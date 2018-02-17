/**
 * Path of child
 *
 * Component - Child - Child Delete
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const deleteChildMutation = gql`
  mutation DeleteChild(
    $id: ID!
  ) {
    deleteChild(
      id: $id
    ) {
      id
    }
  }
`;

@Component({
  selector: 'app-child-delete-cmp',
  templateUrl: './child-delete.component.html',
  styleUrls: ['./child-delete.component.scss']
})
export class ChildDeleteComponent implements OnInit {
  childId: any;
  loading: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {
    this.childId = null;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.childId = params.id;
    });
  }

  submit() {;
    this.apollo.mutate({
      mutation: deleteChildMutation,
      variables: {
        id: this.childId
      }
    }).subscribe(
      res => this.router.navigate(['/child'])
    );
  }
}
