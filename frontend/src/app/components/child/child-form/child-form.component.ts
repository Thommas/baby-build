/**
 * Path of child
 *
 * Component - Child - Form
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import {
  CreateChildMutation,
  GetChild,
  GetChildren,
  UpdateChildMutation
} from '../../../graphql';

@Component({
  selector: 'app-child-form-cmp',
  templateUrl: './child-form.component.html',
  styleUrls: ['./child-form.component.scss']
})
export class ChildFormComponent {
  child: any;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo
  ) {
    this.child = {
      gender: 'f'
    };
  }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {
      if (!params.id) {
        this.loading = false;
        return;
      }

      this.apollo.watchQuery<any>({
        query: GetChild,
        variables: {
          id: params.id
        }
      })
        .valueChanges
        .subscribe(({ data, loading }) => {
          this.loading = loading;
          this.child = data.child;
        });
    });
  }

  submit() {
    // FIXME Form validation

    const child = clone(this.child);
    child.birthdate = child.birthdate.format('x');
    this.apollo.mutate({
      mutation: child.id ? UpdateChildMutation : CreateChildMutation,
      variables: {
        ...child
      },
      refetchQueries: [{
        query: GetChildren
      }]
    }).subscribe(
      res => this.router.navigate(['/child'])
    );
  }
}
