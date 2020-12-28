/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CharacterFacade, FileFacade } from '../../../facade';
import { ConstantsService, FormService } from '../../../services';
import { debounceTime, map, mergeMap, tap } from 'rxjs/operators';
import { fromEvent, Subscription } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-character-show-cmp',
  templateUrl: './character-show.component.html',
  styleUrls: ['./character-show.component.scss']
})
export class CharacterShowComponent implements OnInit {
  @ViewChild('inputElement') inputElement: any;
  formGroup: FormGroup;
  formFieldSub: Subscription;
  selectedCharacter$ = this.characterFacade.selectedCharacter$;

  constructor(
    public constantsService: ConstantsService,
    private formService: FormService,
    private characterFacade: CharacterFacade
  ) {
    this.formGroup = new FormGroup({
      label: new FormControl('', []),
    });
  }

  ngOnInit() {
    const operator = map(() => this.save());
    this.formFieldSub = this.formService.getFormFieldSubscription(this.inputElement, operator);
    this.characterFacade.selectedCharacter$.pipe(
      tap(selectedCharacter => {
        if (selectedCharacter) {
          this.formGroup.patchValue(selectedCharacter);
        }
      }),
    ).subscribe();
  }

  selectCharacter(character?: any) {
    this.characterFacade.selectCharacter(character);
  }

  save() {
    if (!this.formGroup.valid) {
      return;
    }
    const character: any = clone(this.formGroup.value);
    this.characterFacade.updateCharacter(character);
  }

  onKey(event: KeyboardEvent) {
    // FIXME
  }

  deleteCharacter() {
    this.characterFacade.deleteCharacter();
  }

  drop(event: CdkDragDrop<string[]>) {
    const origin = event.previousContainer.id;
    const data = event.item.data;

    console.log('event.previousContainer.id', event.previousContainer.id);
    console.log('event.item.data', event.item.data);

    if (origin === 'list-new-files') {
      this.characterFacade.addFile({
        data: data.data,
        name: data.name,
        size: data.size,
        type: data.type,
      });
    }
  }
}
