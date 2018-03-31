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
 import { ChildService } from '../../../services';

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
    private childService: ChildService,
    private router: Router
  ) {
    this.formGroup = new FormGroup({
      id: new FormControl('', []),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
    this.formGroup.setValue({
      id: null,
      title: null,
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
            title: data.build.title,
            description: data.build.description
          });
        });
    });
  }

  submit() {
    if (!this.childService.child) {
      return;
    }
    const build = clone(this.formGroup.value);
    build.child_id = this.childService.child.id;
    this.apollo.mutate({
      mutation: build.id ? UpdateBuildMutation : CreateBuildMutation,
      variables: {
        ...build
      },
      refetchQueries: [
        {
          query: GetBuild,
          variables: {
            id: build.id,
          }
        },
        {
          query: GetBuilds,
          variables: {
            child_id: this.childService.child.id,
          }
        }
      ]
    }).subscribe(
      res => this.router.navigate(['/build'])
    );
  }
}
