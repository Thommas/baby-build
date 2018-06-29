/**
 * Path of child
 *
 * Component - Header - Child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { ChildService } from '../../../services';

@Component({
  selector: 'app-header-child-cmp',
  templateUrl: './header-child.component.html',
  styleUrls: ['./header-child.component.scss']
})
export class HeaderChildComponent {
  constructor(public childService: ChildService) {}
}
