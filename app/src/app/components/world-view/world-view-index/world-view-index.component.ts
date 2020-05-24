/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, HostListener, ComponentFactoryResolver, ViewChild, OnInit } from '@angular/core';
import { WorldViewItemComponent } from '../world-view-item/world-view-item.component';
import { WorldViewItemDirective } from '../world-view-item/world-view-item.directive';
import { ItemService } from '../../../services';

@Component({
  selector: 'world-view-index-cmp',
  templateUrl: './world-view-index.component.html',
  styleUrls: ['./world-view-index.component.scss']
})
export class WorldViewIndexComponent implements OnInit {
  @ViewChild(WorldViewItemDirective) worldItemHost: WorldViewItemDirective;
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
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(WorldViewItemComponent);
    const componentRef = viewContainerRef.createComponent(componentFactory, data.id);
    const instance = (<WorldViewItemComponent>componentRef.instance);
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
