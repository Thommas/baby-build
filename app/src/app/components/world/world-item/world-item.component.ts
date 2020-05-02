/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Input, OnInit, HostBinding, OnDestroy, OnChanges, Output, EventEmitter } from '@angular/core';
import { timer } from 'rxjs';
import { take, finalize } from 'rxjs/operators';
import { AudioService, ItemService } from '../../../services';

@Component({
  selector: 'world-item-cmp',
  templateUrl: './world-item.component.html',
  styleUrls: ['./world-item.component.scss'],
})
export class WorldItemComponent implements OnInit, OnDestroy, OnChanges {
  @Output() destroy: EventEmitter<any> = new EventEmitter<any>();
  @Input() data: any;
  sub: any;
  animation = '';
  animations = [
    'scale-up-center',
    'scale-down-center',
    'rotate-center',
    'rotate-scale-up',
    'scale-in-center',
    'rotate-in-center',
    'rotate-in-2-fwd',
    'rotate-in-2-bck',
    'swirl-in-fwd',
    'swirl-in-top-fwd',
    'slide-in-top',
    'slide-in-tr',
    'slide-in-right',
    'slide-in-br',
    'slide-in-bottom',
    'slide-in-bl',
    'slide-in-left',
    'slide-in-tl',
    'bounce-in-top',
  ];

  constructor(private audioService: AudioService, private itemService: ItemService) {}

  @HostBinding('class')
  get themeClass(){
    return this.animation;
  };

  @HostBinding('style.top')
  x = "50%";

  @HostBinding('style.left')
  y = "50%";

  ngOnInit() {
    this.x = (Math.round(Math.random() * 90)) + '%';
    this.y = (Math.round(Math.random() * 90)) + '%';
    if (!this.data.asset.animations || 0 === this.data.asset.animations.length) {
      this.generateRandomAnimation();
    }
    this.init();
  }

  generateRandomAnimation() {
    const animationsCount = this.animations.length;
    const rand = Math.floor(Math.random() * animationsCount);
    this.animation = this.animations[rand];
  }

  ngOnChanges() {
    this.init();
  }

  init() {
    console.log('this.data', this.data);
    this.startTimer();
    if (this.data.sound) {
      this.audioService.playSound(this.data.world.name + '/' + this.data.sound);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  startTimer() {
    this.sub = timer(4000).pipe(
      take(1),
      finalize(() => this.destroyThis()),
    ).subscribe();
  }

  destroyThis() {
    this.destroy.emit(this.data.id);
  }
}
