/**
 * Path of child
 *
 * Component - Static - Contact
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-static-contact-cmp',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  @ViewChild('contactForm') contactForm: any;
  contact: any;

  constructor() {
    this.contact = {
      name: '',
      email: '',
      message: ''
    };
  }

  submit() {
    console.log('submit form', this.contactForm.valid);
  }
}
