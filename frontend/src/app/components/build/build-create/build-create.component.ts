/**
 * Path of child
 *
 * Component - Build - Create
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

 import { clone } from 'lodash';
 import { Component } from '@angular/core';
 import { Router } from '@angular/router';
 import { Apollo } from 'apollo-angular';
 import { CreateBuildMutation } from '../../../graphql';

@Component({
  selector: 'app-build-create-cmp',
  templateUrl: './build-create.component.html',
  styleUrls: ['./build-create.component.scss']
})
export class BuildCreateComponent {
  build: any;
  loading: boolean;

  /**
   * Constructor
   */
  constructor(private router: Router, private apollo: Apollo) {
    this.build = {
      name: ''
    };
  }

  submit() {
    let build = clone(this.build);
    this.apollo.mutate({
      mutation: CreateBuildMutation,
      variables: {
        ...build
      }
    }).subscribe(
      res => this.router.navigate(['/build'])
    );
  }
}
