/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { WorldFacade } from '../../../facade';
import { ConstantsService } from '../../../services';

@Component({
  selector: 'app-world-index-cmp',
  templateUrl: './world-index.component.html',
  styleUrls: ['./world-index.component.scss']
})
export class WorldIndexComponent {
  displayFilters: boolean;
  selectedWorld$ = this.worldFacade.selectedWorld$;

  constructor(
    public constantsService: ConstantsService,
    private worldFacade: WorldFacade
  ) {
    this.displayFilters = false;
  }

  selectWorld(world?: any) {
    this.worldFacade.selectWorld(world);
  }

  toggleFilters() {
    this.displayFilters = !this.displayFilters;
  }

  refreshList() {
    this.worldFacade.worldQuery.refetch();
  }
}
