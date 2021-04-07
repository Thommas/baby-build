/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-user-settings-cmp',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent {
  // constructor(public dialogRef: MatDialogRef<UserSettingsComponent>) {}

  onNoClick(): void {
    // this.dialogRef.close();
  }
}
