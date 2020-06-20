/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { CharacterFacade, WorldFacade } from '../../../facade';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-character-list-cmp',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent {
  characters$: any;
  fetchMoreLoading$ = this.characterFacade.fetchMoreLoading$;

  constructor(
    private characterFacade: CharacterFacade,
    private worldFacade: WorldFacade
  ) {
    this.characters$ = this.characterFacade.characters$;
  }

  selectCharacter(character?: any) {
    this.characterFacade.selectCharacter(character);
  }

  onScroll(event) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 100) {
      this.characterFacade.fetchMore();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer.id === 'list-2') {
      const character = event.item.data;
      this.worldFacade.removeCharacter(character.id);
    }
  }
}
