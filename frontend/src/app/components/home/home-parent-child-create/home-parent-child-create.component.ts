/**
 * Path of child
 *
 * Component - Home - Home Parent Child Create
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const createChildMutation = gql`
  mutation CreateChild(
    $firstname: String!
    $middlename: String!
    $lastname: String!
    $nickname: String!
    $birthdate: Int!
    $gender: Boolean!
  ) {
    createChild(
      firstname: $firstname
      middlename: $middlename
      lastname: $lastname
      nickname: $nickname
      birthdate: $birthdate
      gender: $gender
    ) {
      id
    }
  }
`;

@Component({
  selector: 'app-home-parent-child-create-cmp',
  templateUrl: './home-parent-child-create.component.html',
  styleUrls: ['./home-parent-child-create.component.scss']
})
export class HomeParentChildCreateComponent {
  child: any;
  child: any;
  loading: boolean;

  constructor(private router: Router, private apollo: Apollo) {
    this.child = {};
  }

  submit() {
    console.log(this.child);
    this.apollo.mutate({
      mutation: createChildMutation,
      variables: {
        ...this.child
      }
    }).subscribe(
      res => this.router.navigate(['/']);
    );
  }
}
