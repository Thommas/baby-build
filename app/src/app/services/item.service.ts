/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { find } from 'lodash';
import * as uuid from 'uuid/v4';
import { map } from 'rxjs/operators';
import { GetIdeas } from '../graphql';
import { ApolloService } from './apollo.service';

const ASSETS = [];

@Injectable()
export class ItemService {
  isRandom = false;
  assetsIdeas$ = this.apolloService.apolloClient.watchQuery<any>({
    query: GetIdeas,
    variables: {
      category: 'character',
    },
  }).valueChanges
    .pipe(
      map((response: any) => {
        return response.data.ideas.nodes;
      }),
    );
  assets: any[] = [];

  constructor(private apolloService: ApolloService) {

  }

  loadAssets() {
    this.assetsIdeas$.subscribe((ideas: any) => {
      this.assets = ideas;
      console.log('this.assets.length', this.assets.length);
    });
  }

  getData(keyCode: number) {
    if (this.assets.length === 0) {
      return null;
    }
    const newItem: any = {
      id: uuid(),
      keyCode: keyCode,
    };
    this.generateRandomAsset(newItem);
    return newItem;
  }

  generateRandomAsset(newItem: any) {
    const assetsCount = this.assets.length;
    const rand = Math.floor(Math.random() * assetsCount);
    const offset = newItem.keyCode % assetsCount;
    newItem.asset = this.assets[this.isRandom ? rand : offset];
    if (!newItem.asset) {
      return;
    }
    console.log('newItem.asset', newItem.asset.label);
    // this.generateRandomPicture(newItem);
    // this.generateRandomSound(newItem);
  }

  generateRandomPicture(newItem: any) {
    const filesCount = newItem.asset.pictures.length;
    const rand = Math.floor(Math.random() * filesCount);
    const offset = newItem.keyCode % filesCount;
    const filename = newItem.asset.pictures[this.isRandom ? rand : offset];
    newItem.src = `../assets/img/${filename}`;
  }

  generateRandomSound(newItem: any) {
    const filesCount = newItem.asset.sounds.length;
    if (0 === filesCount.length) {
      return;
    }
    const rand = Math.floor(Math.random() * filesCount);
    newItem.sound = newItem.asset.sounds[rand];
  }
}
