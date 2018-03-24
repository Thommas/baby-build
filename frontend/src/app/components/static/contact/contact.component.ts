/**
 * Path of child
 *
 * Component - Static - Contact
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BrowserService, GoogleRecaptchaService } from '../../../services';

@Component({
  selector: 'app-static-contact-cmp',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @ViewChild('googleRecaptchaContainer') googleRecaptchaContainer: any;
  formGroup: FormGroup;
  recaptchaToken: string;

  constructor(
    private elementRef: ElementRef,
    private browserService: BrowserService,
    public googleRecaptchaService: GoogleRecaptchaService
  ) {
    this.formGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      message: new FormControl('', [
        Validators.required,
      ])
    });
    this.formGroup.setValue({
      name: '',
      email: '',
      message: ''
    });
    this.recaptchaToken = null;
  }

  ngOnInit() {
    if (this.browserService.document) {
      this.googleRecaptchaService.init(
        this.browserService.document.body,
        (token) => this.onGetRecaptchaToken(token)
      );
    }
  }

  onGetRecaptchaToken(token: string) {
    console.log('token', token);
    this.recaptchaToken = token;
  }

  submit() {
    if (!this.formGroup.valid) {
      return;
    }
    const contact = clone(this.formGroup.value);
    console.log('contact', contact);
    console.log('token', this.recaptchaToken);
  }
}
