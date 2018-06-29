/**
 * Path of child
 *
 * Component - Static - Terms
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services';

@Component({
  selector: 'app-static-terms-cmp',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.setPage('terms');
  }
}
