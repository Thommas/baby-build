/**
 * Path of child
 *
 * Component - Home - Home Parent
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { AuthService } from '../../../services';

@Component({
  selector: 'app-home-anonymous-cmp',
  templateUrl: './home-anonymous.component.html',
  styleUrls: ['./home-anonymous.component.scss']
})
export class HomeAnonymousComponent {
  constructor(public authService: AuthService) {}
}
