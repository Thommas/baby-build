/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { CharacterFacade } from '../../../facade';
import { ConstantsService } from '../../../services';

@Component({
  selector: 'app-character-index-cmp',
  templateUrl: './character-index.component.html',
  styleUrls: ['./character-index.component.scss']
})
export class CharacterIndexComponent {
  displayFilters: boolean;
  selectedCharacter$ = this.characterFacade.selectedCharacter$;

  constructor(
    public constantsService: ConstantsService,
    private characterFacade: CharacterFacade
  ) {
    this.displayFilters = false;
  }

  selectCharacter(character?: any) {
    this.characterFacade.selectCharacter(character);
  }

  toggleFilters() {
    this.displayFilters = !this.displayFilters;
  }

  selectCategory(category: string) {
    this.characterFacade.updateCharacter({
      category
    });
  }

  refreshList() {
    this.characterFacade.characterQuery.refetch();
  }
}
