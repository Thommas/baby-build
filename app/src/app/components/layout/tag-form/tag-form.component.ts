/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, OnInit, ViewChild, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TagFacade } from '../../../facade';
import { FormService } from '../../../services';

@Component({
  selector: 'app-tag-form-cmp',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.scss']
})
export class TagFormComponent {
  @ViewChild('inputElement') inputElement: any;
  formGroup: FormGroup;
  formFieldSub: Subscription;

  constructor(
    private formService: FormService,
    private tagFacade: TagFacade
  ) {
    this.formGroup = new FormGroup({
      label: new FormControl('', [Validators.required]),
    });
    this.formGroup.setValue({
      label: null,
    });
  }

  ngOnInit() {
    this.formFieldSub = this.formService.getFormFieldSubscription(this.inputElement);
  }

  ngOnDestroy() {
    this.formFieldSub.unsubscribe();
  }

  create() {
    if (!this.formGroup.valid) {
      return;
    }
    const tag: any = clone(this.formGroup.value);
    this.tagFacade.createTag(tag);
  }
}
