/**
 * Path of child
 *
 * Component - Whitelist - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';

import { AuthService } from '../../../services';

@Component({
  selector: 'app-whitelist-index-cmp',
  templateUrl: './whitelist-index.component.html',
  styleUrls: ['./whitelist-index.component.scss']
})
export class WhitelistIndexComponent {
  categories: any = [
    'activity',
    'sport',
    'book',
    'movie',
    'tvshow',
    'anime',
    'video',
    'videogame',
    'toy'
  ];
}
