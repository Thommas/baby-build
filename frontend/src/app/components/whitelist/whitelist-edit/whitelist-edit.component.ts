/**
 * Path of child
 *
 * Component - Whitelist - Edit
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-whitelist-edit-cmp',
  templateUrl: './whitelist-edit.component.html',
  styleUrls: ['./whitelist-edit.component.scss']
})
export class WhitelistEditComponent {
  constructor(
    public dialogRef: MatDialogRef<WhitelistEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSuccess(data) {
    this.dialogRef.close();
  }
}
