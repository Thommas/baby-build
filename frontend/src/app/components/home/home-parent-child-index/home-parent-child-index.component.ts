/**
 * Path of child
 *
 * Component - Home - Home Parent Child Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, OnInit } from '@angular/core';
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
      xp
      level
    }
  }
`;

@Component({
  selector: 'app-home-parent-child-index-cmp',
  templateUrl: './home-parent-child-index.component.html',
  styleUrls: ['./home-parent-child-index.component.scss']
})
export class HomeParentChildIndexComponent implements OnInit {
  loading: boolean;
  children: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.getChildren();
  }

  getChildren() {
    this.apollo.watchQuery<any>({
      query: getChildren
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        console.log('data', data)
        this.loading = loading;
        this.children = data.children;
        console.log(this.children)
      });
  }

  selectChild(child) {
    localStorage.setItem('child', child);
  }
}
