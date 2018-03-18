/**
 * Path of child
 *
 * Pipe - Xp to level up
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { XpToLevelUpPipe } from './xp-to-level-up.pipe';

@NgModule({
  declarations: [
    XpToLevelUpPipe
  ],
  exports:  [
    XpToLevelUpPipe
  ],
  imports:    [
    BrowserModule
  ]
})
export class XpToLevelUpModule {
}
