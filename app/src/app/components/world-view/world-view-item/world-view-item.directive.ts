/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[world-view-item-host]',
})
export class WorldViewItemDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
