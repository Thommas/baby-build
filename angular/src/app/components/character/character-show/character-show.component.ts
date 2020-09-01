/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CharacterFacade } from '../../../facade';
import { ConstantsService, FormService } from '../../../services';
import { map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

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

  ngOnDestroy() {
    this.formFieldSub.unsubscribe();
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
}
