/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable()
export class AudioService {
  isPlaying: boolean = false;

  playSound(file: any) {
    if (this.isPlaying) {
      return;
    }
    this.isPlaying = true;
    const audio = new Audio();
    audio.src = file.data;
    audio.load();
    audio.play();

    timer(1000).pipe(
      take(1),
      tap(() => this.isPlaying = false)
    ).subscribe();
  }
}
