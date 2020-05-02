/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[world-item-host]',
})
export class WorldItemDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
