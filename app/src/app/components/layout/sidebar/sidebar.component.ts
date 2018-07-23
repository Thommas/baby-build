/**
 * Path of child
 *
 * Component - Sidebar
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services';

@Component({
  selector: 'app-sidebar-cmp',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output('toggleSidebar') toggleSidebar: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public authService: AuthService
  ) {}
}
