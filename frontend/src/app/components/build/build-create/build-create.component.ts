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
 import { CreateBuildMutation, GetBuilds } from '../../../graphql';
 import { ChildService } from '../../../services';

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
  constructor(
    private apollo: Apollo,
    private childService: ChildService,
    private router: Router
  ) {
    this.build = {};
  }

  submit() {
    if (!this.childService.child) {
      return;
    }
    const build = clone(this.build);
    build.child_id = this.childService.child.id;
    this.apollo.mutate({
      mutation: CreateBuildMutation,
      variables: {
        ...build
      },
      refetchQueries: [{
        query: GetBuilds,
        variables: {
          child_id: this.childService.child.id,
        }
      }]
    }).subscribe(
      res => this.router.navigate(['/build'])
    );
  }
}
