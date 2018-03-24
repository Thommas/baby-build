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
import { BrowserService, HttpService, GoogleRecaptchaService } from '../../../services';
import { environment } from '../../../../environments/environment';

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
    private httpService: HttpService,
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
        token => this.recaptchaToken = token
      );
    }
  }

  submit() {
    if (!this.formGroup.valid || !this.recaptchaToken) {
      return;
    }
    const contact = clone(this.formGroup.value);
    contact.token = this.recaptchaToken;
    console.log('environment.contactUrl', environment.contactUrl)
    console.log('contact', contact)
    this.httpService.post(environment.contactUrl, contact).subscribe(
      res => console.log('res', res),
      err => console.log('err', err)
    );
  }
}
