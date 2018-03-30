/**
 * Path of child
 *
 * Component - Home - Home Parent
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { AuthService, SeoService } from '../../../services';

@Component({
  selector: 'app-home-anonymous-cmp',
  templateUrl: './home-anonymous.component.html',
  styleUrls: ['./home-anonymous.component.scss']
})
export class HomeAnonymousComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.seoService.setPage('home');
  }
}
