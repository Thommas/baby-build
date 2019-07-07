/**
 * Path of child
 *
 * Component - User - Edit
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { UserFacade } from '../../../facade';
import { UpdateUserMutation } from '../../../graphql';

@Component({
  selector: 'app-user-edit-cmp',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  @ViewChild('inputElement') inputElement: any;
  formGroup: FormGroup;
  loading: boolean;

  constructor(
    public userFacade: UserFacade,
    private apollo: Apollo
  ) {
    this.formGroup = new FormGroup({
      id: new FormControl('', [Validators.required]),
      firstName: new FormControl('', []),
      lastName: new FormControl('', []),
    });
    this.loading = true;
    // userFacade.user$.subscribe((user: any) => {
    //   this.loading = false;
    //   this.formGroup.setValue({
    //     id: user.id,
    //     firstName: user.firstName,
    //     lastName: user.lastName
    //   })
    // });
  }

  ngOnInit() {
    fromEvent(this.inputElement.nativeElement, 'input').pipe(
      map((e: { target: HTMLInputElement }) => e.target.value),
      debounceTime(800),
      distinctUntilChanged(),
    ).subscribe(data => this.save());
  }

  save() {
    console.log('save');
    if (!this.formGroup.valid) {
      return;
    }
    const data: any = clone(this.formGroup.value);
    this.apollo.mutate({
      mutation: UpdateUserMutation,
      variables: data,
      optimisticResponse: {
        __typename: 'Mutation',
        updateUser: {
          __typename: 'User',
          ...data
        },
      },
      update: (store, { data: { updateUser } }) => {
        if (!updateUser) {
          return;
        }
        console.log('updateUser', updateUser);
        // const query: any = store.readQuery({ query: GetIdeas });
        // const updatedIdeas: any[] = query.ideas.map((idea: any) => idea.id === updateIdea.id ? {
        //   ...idea,
        //   firstName: updateIdea.label,
        // } : idea);
        // store.writeQuery({ query: GetIdeas, data: { ideas: updatedIdeas }});
        // this.idea.label = updateIdea.label;
      }
    }).subscribe();
  }
}
