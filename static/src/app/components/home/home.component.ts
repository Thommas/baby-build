/**
 * Path of child
 *
 * Component - Home
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services';

@Component({
  selector: 'app-home-cmp',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.seoService.setPage('home');
  }
}
