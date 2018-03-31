/**
 * Path of child
 *
 * Component - Child - Form
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
export class ChildFormComponent implements OnInit {
  formGroup: FormGroup;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo
  ) {
    this.formGroup = new FormGroup({
      id: new FormControl('', []),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      middlenames: new FormControl('', [Validators.required]),
      nickname: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    });
    this.formGroup.setValue({
      id: null,
      firstname: null,
      lastname: null,
      middlenames: null,
      nickname: null,
      birthdate: null,
      gender: 'f'
    });
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
          this.formGroup.setValue(data.child);
        });
    });
  }

  submit() {
    if (!this.formGroup.valid) {
      return;
    }
    const child = clone(this.formGroup.value);
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
