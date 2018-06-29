/**
 * Path of child
 *
 * Component - Header - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { BuildService, ChildService } from '../../../services';

@Component({
  selector: 'app-header-build-cmp',
  templateUrl: './header-build.component.html',
  styleUrls: ['./header-build.component.scss']
})
export class HeaderBuildComponent {
  constructor(
    public buildService: BuildService,
    public childService: ChildService
  ) {}
}
