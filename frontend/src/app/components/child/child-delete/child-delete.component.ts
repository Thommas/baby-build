/**
 * Path of child
 *
 * Component - Child - Delete
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { DeleteChildMutation } from '../../../graphql';

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
      mutation: DeleteChildMutation,
      variables: {
        id: this.childId
      }
    }).subscribe(
      res => this.router.navigate(['/child'])
    );
  }
}
