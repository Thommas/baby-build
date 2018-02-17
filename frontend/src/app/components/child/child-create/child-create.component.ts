/**
 * Path of child
 *
 * Component - Child - Child Create
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
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
    $birthdate: String!
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
  selector: 'app-child-create-cmp',
  templateUrl: './child-create.component.html',
  styleUrls: ['./child-create.component.scss']
})
export class ChildCreateComponent {
  child: any;
  loading: boolean;

  constructor(private router: Router, private apollo: Apollo) {
    this.child = {};
  }

  submit() {
    let child = clone(this.child);
    child.birthdate = child.birthdate.format('x');
    this.apollo.mutate({
      mutation: createChildMutation,
      variables: {
        ...child
      }
    }).subscribe(
      res => this.router.navigate(['/child'])
    );
  }
}
