/**
 * Path of child
 *
 * Component - Build - Form
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

 import { clone } from 'lodash';
 import { Component, OnInit } from '@angular/core';
 import { ActivatedRoute, Router } from '@angular/router';
 import { FormGroup, FormControl, Validators } from '@angular/forms';
 import { Apollo } from 'apollo-angular';
 import {
  CreateBuildMutation,
  GetBuild,
  GetBuilds,
  UpdateBuildMutation
} from '../../../graphql';

@Component({
  selector: 'app-build-form-cmp',
  templateUrl: './build-form.component.html',
  styleUrls: ['./build-form.component.scss']
})
export class BuildFormComponent implements OnInit {
  formGroup: FormGroup;
  loading: boolean;

  /**
   * Constructor
   */
  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private router: Router
  ) {
    this.formGroup = new FormGroup({
      id: new FormControl('', []),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
    this.formGroup.setValue({
      id: null,
      name: null,
      description: null
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
        query: GetBuild,
        variables: {
          id: params.id
        }
      })
        .valueChanges
        .subscribe(({ data, loading }) => {
          this.loading = loading;
          this.formGroup.setValue({
            id: data.build.id,
            name: data.build.name,
            description: data.build.description
          });
        });
    });
  }

  submit() {
    const build = clone(this.formGroup.value);
    this.apollo.mutate({
      mutation: build.id ? UpdateBuildMutation : CreateBuildMutation,
      variables: {
        ...build
      }
    }).subscribe(
      res => this.router.navigate([`${res.data.createBuild.id}/task`])
    );
  }
}
