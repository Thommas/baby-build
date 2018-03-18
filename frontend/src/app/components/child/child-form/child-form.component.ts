/**
 * Path of child
 *
 * Component - Child - Form
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import {
  CreateChildMutation
} from '../../../graphql';

@Component({
  selector: 'app-child-form-cmp',
  templateUrl: './child-form.component.html',
  styleUrls: ['./child-form.component.scss']
})
export class ChildFormComponent {
  child: any;
  loading: boolean;

  constructor(private router: Router, private apollo: Apollo) {
    this.child = {
      gender: 'f'
    };
  }

  // FIXME Detect if childId in url for update

  submit() {
    // FIXME Form validation
    const child = clone(this.child);
    child.birthdate = child.birthdate.format('x');
    this.apollo.mutate({
      mutation: CreateChildMutation,
      variables: {
        ...child
      }
    }).subscribe(
      res => this.router.navigate(['/child'])
    );
  }
}
