/**
 * Path of child
 *
 * Component - Idea - Show
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-idea-show-cmp',
  templateUrl: './idea-show.component.html',
  styleUrls: ['./idea-show.component.scss']
})
export class IdeaShowComponent {
  @Input('idea') idea: any;
  loading: boolean;

  constructor(private apollo: Apollo) {
    this.idea = {};
  }
}
