/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { CharacterFacade } from '../../../facade';

@Component({
  selector: 'app-audio-list-cmp',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss']
})
export class AudioListComponent {
  selectedCharacter$ = this.characterFacade.selectedCharacter$;

  constructor(
    private characterFacade: CharacterFacade
  ) {
  }

  onFileDropped(files: File[]) {
    const promises = [];
    for (const file of files) {
      promises.push(this.getFileReaderPromise(file));
    }
    Promise.all(promises).then((files: any) => {
      for (const file of files) {
        this.characterFacade.addAudio(file);
      }
    });
  }

  getFileReaderPromise(file: File) {
    return new Promise((resolve) => {
      const fr = new FileReader();
      fr.onload = (event: any) => resolve({
        name: file.name,
        type: file.type,
        size: file.size,
        data: event.target.result
      });
      fr.readAsDataURL(file);
    });
  }

  removeAudio(audioId: string) {
    this.characterFacade.removeAudio({
      fileId: audioId
    });
  }
}
