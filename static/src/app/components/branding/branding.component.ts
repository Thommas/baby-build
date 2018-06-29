/**
 * Path of child
 *
 * Component - Static - Branding
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../../../services';

@Component({
  selector: 'app-static-branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.scss']
})
export class BrandingComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.setPage('branding');
  }
}
