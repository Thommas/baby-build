/**
 * Path of child
 *
 * Component - Home - Home Parent Child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-home-parent-child-index-cmp',
  templateUrl: './home-parent-child-index.component.html',
  styleUrls: ['./home-parent-child-index.component.scss']
})
export class HomeParentChildIndexComponent {
  addNewChild() {
    // FIXME
  }

  selectChild(child) {
    localStorage.setItem('child', child);
  }
}
