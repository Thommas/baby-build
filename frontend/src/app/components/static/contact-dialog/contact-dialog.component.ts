/**
 * Path of child
 *
 * Component - Static - Contact Dialog
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-static-contact-dialog-cmp',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent {
  contact: any;

  constructor(
    public dialogRef: MatDialogRef<ContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  )
  {
    this.contact = {
      name: '',
      email: '',
      message: ''
    }
  }

  submit() {
    console.log('submit form');
    // this.dialogRef.close();
  }
}
