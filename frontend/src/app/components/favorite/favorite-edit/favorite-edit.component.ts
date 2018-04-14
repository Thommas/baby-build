/**
 * Path of child
 *
 * Component - Favorite - Edit
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-favorite-edit-cmp',
  templateUrl: './favorite-edit.component.html',
  styleUrls: ['./favorite-edit.component.scss']
})
export class FavoriteEditComponent {
  constructor(
    public dialogRef: MatDialogRef<FavoriteEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSuccess(data) {
    this.dialogRef.close();
  }
}
