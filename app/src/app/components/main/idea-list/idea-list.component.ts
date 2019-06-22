/**
 * Path of child
 *
 * Component - Idea - List
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { IdeaFacade } from '../../../facade';

@Component({
  selector: 'app-idea-list-cmp',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.scss']
})
export class IdeaListComponent {
  @Input() displayFilters: boolean;
  @Output() selectIdea: EventEmitter<any> = new EventEmitter<any>();
  ideas$: any;

  constructor(
    private apollo: Apollo,
    private ideaFacade: IdeaFacade
  ) {
    this.ideas$ = this.ideaFacade.ideas$;
  }
}
