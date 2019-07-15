/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Input, OnChanges } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { UpdateIdeaIconMutation } from '../../../graphql';

@Component({
  selector: 'app-idea-icon-cmp',
  templateUrl: './idea-icon.component.html',
  styleUrls: ['./idea-icon.component.scss']
})
export class IdeaIconComponent implements OnChanges {
  @Input() ideaId: string;
  @Input() ideaLabel: string;
  @Input() ideaIcon: string;
  src: string;
  color: string;
  palette: string[] = [
    '182952',
    '2b3595',
    '7045af',
    'e14594',
    'a26ea1',
    'f18a9b',
    'ffb480',
    'ffff9d',
  ];

  constructor(private apollo: Apollo) {
    this.ideaId = null;
    this.ideaLabel = null;
    this.ideaIcon = null;
    this.src = null;
    this.color = null;
  }

  ngOnChanges() {
    this.setColor();
    this.setIcon();
  }

  updateIcon() {
    if (!this.ideaId || this.ideaIcon) {
      return;
    }
    this.apollo.mutate({
      mutation: UpdateIdeaIconMutation,
      variables: {
        id: this.ideaId,
      },
    }).subscribe();
  }

  setColor() {
    this.color = this.palette[this.getHash(this.ideaId) % 8];
  }

  setIcon() {
    if (this.ideaIcon) {
      this.src =  this.ideaIcon;
    } else if (!this.ideaLabel || this.ideaLabel.length === 0) {
      this.src = 'https://via.placeholder.com/48x48/'+this.color+'/000000?text=?';
    } else {
      this.src = 'https://via.placeholder.com/48x48/'+this.color+'/000000?text='+this.ideaLabel[0];
    }
  }

  protected getHash(value: string) {
    if (value.length === 0) {
      return 0;
    }

    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      const chr = value.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }

    if (hash < 0) {
      return -hash;
    }

    return hash;
  }
}
