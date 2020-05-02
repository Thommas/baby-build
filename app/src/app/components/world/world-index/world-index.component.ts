/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, HostListener, ComponentFactoryResolver, ViewChild, OnInit } from '@angular/core';
import { WorldItemComponent } from '../world-item/world-item.component';
import { WorldItemDirective } from '../world-item/world-item.directive';
import { ItemService } from '../../../services';

@Component({
  selector: 'world-index-cmp',
  templateUrl: './world-index.component.html',
  styleUrls: ['./world-index.component.scss']
})
export class WorldIndexComponent implements OnInit {
  @ViewChild(WorldItemDirective) worldItemHost: WorldItemDirective;
  components: string[] = [];
  mainId: string = null;

  constructor(
    private itemService: ItemService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.addItem(event.keyCode);
    return false;
  }

  addItem(keyCode: number) {
    if (this.components.length > 20) {
      return;
    }
    const data = this.itemService.getData(keyCode);
    if (!data) {
      return;
    }
    const viewContainerRef = this.worldItemHost.viewContainerRef;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(WorldItemComponent);
    const componentRef = viewContainerRef.createComponent(componentFactory, data.id);
    const instance = (<WorldItemComponent>componentRef.instance);
    this.components.push(data.id);
    instance.data = data;
    instance.destroy.subscribe((itemId: any) => this.onDestroy(itemId));
    componentRef.changeDetectorRef.detectChanges();
  }

  ngOnInit() {
    this.itemService.loadAssets();
  }

  onDestroy(itemId: any) {
    const index = this.components.indexOf(itemId);
    const viewContainerRef = this.worldItemHost.viewContainerRef;
    viewContainerRef.remove(index);
    this.components.splice(index, 1);
    if (itemId === this.mainId) {
      this.mainId = null;
    }
  }
}
