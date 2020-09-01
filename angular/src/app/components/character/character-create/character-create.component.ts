/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CharacterFacade, CharacterSuggestFacade } from '../../../facade';
import { ConstantsService, FormService } from '../../../services';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-character-create-cmp',
  templateUrl: './character-create.component.html',
  styleUrls: ['./character-create.component.scss']
})
export class CharacterCreateComponent implements OnInit {
  @Input() character: any;
  @ViewChild('inputElement') inputElement: any;
  formGroup: FormGroup;
  loading: boolean;
  emptyCharacterReadyForDeletion: boolean;
  formFieldSub: Subscription;
  suggestedCharacters$: any;
  newCharacters: any[] = this.characterFacade.newCharacters;

  constructor(
    public constantsService: ConstantsService,
    private characterFacade: CharacterFacade,
    private characterSuggestFacade: CharacterSuggestFacade,
    private formService: FormService
  ) {
    this.emptyCharacterReadyForDeletion = false;
    this.character = {};
    this.formGroup = new FormGroup({
      label: new FormControl('', []),
    });
    this.formGroup.setValue({
      label: '',
    });
    this.suggestedCharacters$ = this.characterFacade.suggestedCharacters$;
  }

  ngOnInit() {
    const operator = map(() => this.search());
    this.formFieldSub = this.formService.getFormFieldSubscription(this.inputElement, operator);
  }

  ngOnDestroy() {
    this.formFieldSub.unsubscribe();
  }

  search() {
    if (!this.formGroup.valid) {
      this.characterSuggestFacade.set({
        name: null,
      });
      return;
    }
    const data: any = clone(this.formGroup.value);
    this.characterSuggestFacade.set({
      name: data.label,
    });
  }

  create() {
    if (!this.formGroup.valid) {
      return;
    }
    const character: any = clone(this.formGroup.value);
    this.characterFacade.createCharacter(character);
    this.formGroup.patchValue({
      label: '',
    });
  }

  onKey(event: KeyboardEvent) {
    // FIXME
  }

  focusInput() {
    this.inputElement.nativeElement.focus();
  }
}
