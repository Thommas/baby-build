/**
 * Path of child
 *
 * Component - Build - Show
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GetBuild } from '../../../graphql';
import { BuildService } from '../../../services';

@Component({
  selector: 'app-build-show-cmp',
  templateUrl: './build-show.component.html',
  styleUrls: ['./build-show.component.scss']
})
export class BuildShowComponent {
  loading: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apollo: Apollo,
    public buildService: BuildService
  ) {}

  goToCalendar() {
    this.router.navigate(['calendar/era/baby']);
  }
}
