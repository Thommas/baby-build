/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WorldFacade } from '../../../facade';

@Component({
  selector: 'app-world-list-cmp',
  templateUrl: './world-list.component.html',
  styleUrls: ['./world-list.component.scss']
})
export class WorldListComponent {
  worlds$: any;
  fetchMoreLoading$ = this.worldFacade.fetchMoreLoading$;

  constructor(
    private router: Router,
    private worldFacade: WorldFacade
  ) {
    this.worlds$ = this.worldFacade.worlds$;
  }

  selectWorld(world?: any) {
    this.router.navigate([`world/${world.id}`]);
  }

  onScroll(event) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 100) {
      this.worldFacade.fetchMore();
    }
  }
}
