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
  constructor(
    public constantsService: ConstantsService,
    private worldFacade: WorldFacade
  ) {
  }

  refreshList() {
    this.worldFacade.worldQuery.refetch();
  }
}
