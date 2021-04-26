/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services';
import { UserSettingsComponent } from '../../user/user-settings/user-settings.component';

@Component({
  selector: 'app-topbar-cmp',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  @Output('toggleSidebar') toggleSidebar: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public authService: AuthService
  ) {}

  openSettings(): void {
    // const dialogRef = this.dialog.open(UserSettingsComponent, {
    //   width: '800px',
    //   hasBackdrop: true,
    //   disableClose: true
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

  createNewWorld() {
    // this.worldFacade.createWorld();
  }

  logout() {
    this.authService.logout();
    console.log('REDIRECT');
  }
}
