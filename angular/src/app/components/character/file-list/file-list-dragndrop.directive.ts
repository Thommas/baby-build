/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import {
  Directive,
  Output,
  Input,
  EventEmitter,
  HostBinding,
  HostListener
} from '@angular/core';

const SUPPORTED_TYPES = [
  'image/png',
];

@Directive({
  selector: '[file-list-dragndrop]'
})
export class FileListDragndropDirective {
  @HostBinding('class.fileover') fileOver: boolean;
  @Output() fileDropped = new EventEmitter<any>();

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = true;
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(event) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;

    let files = event.dataTransfer.files || event.target.files;
    if (!files) {
      return;
    }
    files = Array.from(files).filter((file: File) => SUPPORTED_TYPES.includes(file.type));
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
