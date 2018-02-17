/**
 * Path of child
 *
 * Component - Child - Child Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const getChildren = gql`
  query GetChildren {
    children {
      id
      firstname
      middlename
      lastname
      nickname
      birthdate
      gender
      xp
      level
    }
  }
`;

@Component({
  selector: 'app-child-index-cmp',
  templateUrl: './child-index.component.html',
  styleUrls: ['./child-index.component.scss']
})
export class ChildIndexComponent implements OnInit {
  loading: boolean;
  children: any;

  constructor(private router: Router, private apollo: Apollo) {}

  ngOnInit() {
    this.getChildren();
  }

  getChildren() {
    this.apollo.watchQuery<any>({
      query: getChildren
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.children = data.children;
      });
  }

  selectChild(child) {
    localStorage.setItem('child', child);
    this.router.navigate(['/']);
  }
}
