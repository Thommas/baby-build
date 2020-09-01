/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import * as uuid from 'uuid/v4';
import { map, first } from 'rxjs/operators';
import { ApolloService } from './apollo.service';
import { WorldFacade } from '../facade';

@Injectable()
export class ItemService {
  isRandom = false;
  assetsCharacters$ = this.worldFacade.world$
    .pipe(
      map((world: any) => {
        return world.characters ? world.characters : [];
      }),
    );

  constructor(private apolloService: ApolloService, private worldFacade: WorldFacade) {

  }

  async getData(keyCode: number) {
    const assets = await this.assetsCharacters$.pipe(first()).toPromise();
    if (assets.length === 0) {
      return null;
    }
    const newItem: any = {
      id: uuid(),
      keyCode: keyCode,
    };
    this.generateRandomAsset(assets, newItem);
    return newItem;
  }

  generateRandomAsset(assets: any, newItem: any) {
    const assetsCount = assets.length;
    const rand = Math.floor(Math.random() * assetsCount);
    const offset = newItem.keyCode % assetsCount;
    newItem.asset = assets[this.isRandom ? rand : offset];
    if (!newItem.asset) {
      return;
    }
    // this.generateRandomPicture(newItem);
    this.generateRandomSound(newItem);
  }

  // generateRandomPicture(newItem: any) {
  //   const filesCount = newItem.asset.pictures.length;
  //   const rand = Math.floor(Math.random() * filesCount);
  //   const offset = newItem.keyCode % filesCount;
  //   const filename = newItem.asset.pictures[this.isRandom ? rand : offset];
  //   newItem.src = `../assets/img/${filename}`;
  // }

  generateRandomSound(newItem: any) {
    if (!newItem.asset.audios) {
      return;
    }
    const filesCount = newItem.asset.audios.length;
    if (0 === filesCount.length) {
      return;
    }
    const rand = Math.floor(Math.random() * filesCount);
    newItem.sound = newItem.asset.audios[rand];
  }
}
