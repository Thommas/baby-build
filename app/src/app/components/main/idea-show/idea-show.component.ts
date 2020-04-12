/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { IdeaFacade } from '../../../facade';
import { ConstantsService } from '../../../services';

@Component({
  selector: 'app-idea-show-cmp',
  templateUrl: './idea-show.component.html',
  styleUrls: ['./idea-show.component.scss']
})
export class IdeaShowComponent {
  selectedIdea$ = this.ideaFacade.selectedIdea$;

  constructor(
    public constantsService: ConstantsService,
    private ideaFacade: IdeaFacade
  ) {}

  selectIdea(idea?: any) {
    this.ideaFacade.selectIdea(idea);
  }
}
