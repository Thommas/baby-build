/**
 * Path of child
 *
 * Component - Idea - Item
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import uuid from 'uuid/v4';
import { clone, isEmpty } from 'lodash';
import { Component, Input, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap, flatMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
  CreateIdeaMutation,
  UpdateIdeaMutation,
  DeleteIdeaMutation,
  GetIdeas
} from '../../../graphql';
import { UserService } from '../../../services';

@Component({
  selector: 'app-idea-item-cmp',
  templateUrl: './idea-item.component.html',
  styleUrls: ['./idea-item.component.scss']
})
export class IdeaItemComponent implements OnInit, OnChanges {
  @Input() idea: any;
  @ViewChild('inputElement') inputElement: any;
  formGroup: FormGroup;
  loading: boolean;
  emptyIdeaReadyForDeletion: boolean;

  constructor(private apollo: Apollo, private userService: UserService) {
    this.emptyIdeaReadyForDeletion = false;
    this.idea = {};
    this.formGroup = new FormGroup({
      id: new FormControl('', [Validators.required]),
      label: new FormControl('', []),
      icon: new FormControl('', []),
    });
    this.formGroup.setValue({
      id: null,
      label: '',
      icon: null,
    });
  }

  ngOnInit() {
    fromEvent(this.inputElement.nativeElement, 'input').pipe(
      map((e: { target: HTMLInputElement }) => e.target.value),
      debounceTime(800),
      distinctUntilChanged(),
    ).subscribe(data => this.save());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.idea && changes.idea.previousValue) {
      this.save();
    }
    if (changes.idea) {
      if (changes.idea.currentValue) {
        const idea: any = changes.idea.currentValue;
        this.formGroup.setValue({
          id: idea.id,
          label: idea.label,
          icon: idea.icon,
        });
        if (!idea.label || idea.label.length === 0) {
          this.emptyIdeaReadyForDeletion = true;
        }
      } else {
        this.formGroup.setValue({
          id: null,
          label: '',
          icon: null,
        });
      }
    }
  }

  save() {
    if (!this.formGroup.valid) {
      return;
    }
    const data: any = clone(this.formGroup.value);
    this.userService.user$.pipe(
      flatMap((user: any) => {
        return this.apollo.mutate({
          mutation: UpdateIdeaMutation,
          variables: data,
          optimisticResponse: {
            __typename: 'Mutation',
            updateIdea: {
              __typename: 'Idea',
              ...data,
              userId: user.id,
              user: {
                __typename: 'User',
                firstName: user.firstName,
                lastName: user.lastName,
              },
              requiredAge: 0,
              score: 0,
            },
          },
          update: (store, { data: { updateIdea } }) => {
            if (!updateIdea) {
              return;
            }
            const query: any = store.readQuery({ query: GetIdeas });
            const updatedIdeas: any[] = query.ideas.map((idea: any) => idea.id === updateIdea.id ? {
              ...idea,
              label: updateIdea.label,
            } : idea);
            store.writeQuery({ query: GetIdeas, data: { ideas: updatedIdeas }});
            this.idea.label = updateIdea.label;
          }
        });
      })
    ).subscribe();
  }

  onKey(event: KeyboardEvent) {
    if (!this.formGroup.get('label').value || this.formGroup.get('label').value.length === 0) {
      if (this.emptyIdeaReadyForDeletion) {
        this.delete();
      } else {
        this.emptyIdeaReadyForDeletion = true;
      }
    } else {
      this.emptyIdeaReadyForDeletion = false;
    }
  }

  delete() {
    this.apollo.mutate({
      mutation: DeleteIdeaMutation,
      variables: {
        id: this.idea.id
      },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteIdea: {
          __typename: 'Idea',
          id: this.idea.id
        },
      },
      update: (store, { data: { deleteIdea } }) => {
        if (!deleteIdea) {
          return;
        }
        const query: any = store.readQuery({ query: GetIdeas });
        const updatedIdeas: any[] = query.ideas.filter((idea: any) => idea.id && idea.id !== deleteIdea.id);
        store.writeQuery({ query: GetIdeas, data: { ideas: updatedIdeas }});
        this.idea.id = null;
      },
    }).subscribe();
  }
}
