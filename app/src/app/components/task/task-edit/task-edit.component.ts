/**
 * Path of child
 *
 * Component - Task - Edit
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-task-edit-cmp',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSuccess(data) {
    this.dialogRef.close();
  }
}
