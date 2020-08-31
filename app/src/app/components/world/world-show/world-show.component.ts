/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WorldFacade } from '../../../facade';
import { ConstantsService } from '../../../services';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-world-show-cmp',
  templateUrl: './world-show.component.html',
  styleUrls: ['./world-show.component.scss']
})
export class WorldShowComponent implements OnInit {
  @ViewChild('inputElement') inputElement: any;
  world$: any = this.worldFacade.world$;
  selectedWorld$ = this.worldFacade.selectedWorld$;

  constructor(
    private route: ActivatedRoute,
    public constantsService: ConstantsService,
    private worldFacade: WorldFacade
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.worldFacade.getWorldById(params.id);
    });
  }

  selectWorld(world?: any) {
    this.worldFacade.selectWorld(world);
  }

  deleteWorld() {
    this.worldFacade.deleteWorld();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer.id === 'list-1') {
      const character = event.item.data;
      this.worldFacade.addCharacter(character);
    }
  }
}
