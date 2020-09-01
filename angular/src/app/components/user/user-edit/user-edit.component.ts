/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { UserFacade } from '../../../facade';
import { FormService } from '../../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-edit-cmp',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {
  @ViewChild('inputElement') inputElement: any;
  userSubscription: Subscription;
  formFieldSub: Subscription;
  formGroup: FormGroup;

  constructor(
    private formService: FormService,
    public userFacade: UserFacade
  ) {
    this.formGroup = new FormGroup({
      id: new FormControl('', [Validators.required]),
      firstName: new FormControl('', []),
      lastName: new FormControl('', []),
    });
  }

  ngOnInit() {
    const operator = map(() => this.save());
    this.formFieldSub = this.formService.getFormFieldSubscription(this.inputElement, operator);
    this.userSubscription = this.userFacade.user$.subscribe((user: any) => {
      this.formGroup.setValue({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName
      })
    });
  }

  ngOnDestroy() {
    this.formFieldSub.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  save() {
    if (!this.formGroup.valid) {
      return;
    }
    const user: any = clone(this.formGroup.value);
    this.userFacade.updateUser(user);
  }
}
