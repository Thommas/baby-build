/**
 * Path of child
 *
 * App - Module - Server
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 *
 * @see https://angular.io/guide/universal
 */

import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    FlexLayoutServerModule
  ],
  bootstrap: [ AppComponent ],
})
export class AppServerModule {}
