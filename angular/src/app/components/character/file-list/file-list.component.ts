/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component } from '@angular/core';
import { CharacterFacade } from '../../../facade';

@Component({
  selector: 'app-file-list-cmp',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent {
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
        this.characterFacade.addFile(file);
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

  removeFile(fileId: string) {
    this.characterFacade.removeFile({
      fileId: fileId
    });
  }
}
