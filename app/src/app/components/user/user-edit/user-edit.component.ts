/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, } from 'rxjs/operators';
import { UserFacade } from '../../../facade';

@Component({
  selector: 'app-user-edit-cmp',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {
  @ViewChild('inputElement') inputElement: any;
  userSubscription;
  formGroup: FormGroup;

  constructor(
    public userFacade: UserFacade
  ) {
    this.formGroup = new FormGroup({
      id: new FormControl('', [Validators.required]),
      firstName: new FormControl('', []),
      lastName: new FormControl('', []),
    });
  }

  ngOnInit() {
    this.userSubscription = this.userFacade.user$.subscribe((user: any) => {
      this.formGroup.setValue({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName
      })
    });
    fromEvent(this.inputElement.nativeElement, 'input').pipe(
      map((e: { target: HTMLInputElement }) => e.target.value),
      debounceTime(800),
      distinctUntilChanged(),
    ).subscribe(data => this.save());
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  save() {
    console.log('save');
    if (!this.formGroup.valid) {
      return;
    }
    const user: any = clone(this.formGroup.value);
    this.userFacade.updateUser(user);
  }
}
