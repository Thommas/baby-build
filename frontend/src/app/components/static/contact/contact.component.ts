/**
 * Path of child
 *
 * Component - Static - Contact
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BrowserService, GoogleRecaptchaService } from '../../../services';

@Component({
  selector: 'app-static-contact-cmp',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @ViewChild('contactForm') contactForm: any;
  @ViewChild('googleRecaptchaContainer') googleRecaptchaContainer: any;

  constructor(
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
  }

  ngOnInit() {
    if (this.browserService.document) {
      this.googleRecaptchaService.init(this.browserService.document.body);
    }
  }

  submit() {
    if (!this.formGroup.valid) {
      return;
    }
    const contact = clone(this.formGroup.value);
    console.log('contact', contact);
  }
}
