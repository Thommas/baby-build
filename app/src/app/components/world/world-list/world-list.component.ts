/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
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
    private worldFacade: WorldFacade
  ) {
    this.worlds$ = this.worldFacade.worlds$;
  }

  selectWorld(world?: any) {
    this.worldFacade.selectWorld(world);
  }

  onScroll(event) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 100) {
      this.worldFacade.fetchMore();
    }
  }
}
