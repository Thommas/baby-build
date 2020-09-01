/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, Input, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CharacterFacade, UserFacade } from '../../../facade';
import { ConstantsService, FormService } from '../../../services';
import { map } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-character-item-cmp',
  templateUrl: './character-item.component.html',
  styleUrls: ['./character-item.component.scss']
})
export class CharacterItemComponent implements OnInit, OnChanges {
  @Input() character: any;
  @ViewChild('inputElement') inputElement: any;
  formGroup: FormGroup;
  loading: boolean;
  emptyCharacterReadyForDeletion: boolean;
  formFieldSub: Subscription;

  constructor(
    public constantsService: ConstantsService,
    public characterFacade: CharacterFacade,
    private userFacade: UserFacade,
    private formService: FormService
  ) {
    this.emptyCharacterReadyForDeletion = false;
    this.character = {};
    // this.formGroup = new FormGroup({
    //   id: new FormControl('', [Validators.required]),
    //   label: new FormControl('', []),
    //   icon: new FormControl('', []),
    //   requiredAge: new FormControl('', []),
    //   score: new FormControl('', []),
    // });
    // this.formGroup.setValue({
    //   id: null,
    //   label: '',
    //   icon: null,
    //   requiredAge: null,
    //   score: null,
    // });
  }

  ngOnInit() {
    // const operator = map(() => this.save());
    // this.formFieldSub = this.formService.getFormFieldSubscription(this.inputElement, operator);
  }

  ngOnDestroy() {
    // this.formFieldSub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes.character && changes.character.previousValue) {
    //   this.save();
    // }
    // if (changes.character) {
    //   if (changes.character.currentValue) {
    //     const character: any = changes.character.currentValue;
    //     this.formGroup.setValue({
    //       id: character.id,
    //       label: character.label,
    //       icon: character.icon,
    //       requiredAge: character.requiredAge,
    //       score: character.score,
    //     });
    //     if (!character.label || character.label.length === 0) {
    //       this.emptyCharacterReadyForDeletion = true;
    //     }
    //   } else {
    //     this.formGroup.setValue({
    //       id: null,
    //       label: '',
    //       icon: null,
    //       requiredAge: null,
    //       score: null,
    //     });
    //   }
    // }
  }

  save() {
    // if (!this.formGroup.valid) {
    //   return;
    // }
    // const character: any = clone(this.formGroup.value);
    // this.characterFacade.updateCharacter(character);
  }

  onKey(event: KeyboardEvent) {
    // if (!this.formGroup.get('label').value || this.formGroup.get('label').value.length === 0) {
    //   if (this.emptyCharacterReadyForDeletion) {
    //     this.delete();
    //   } else {
    //     this.emptyCharacterReadyForDeletion = true;
    //   }
    // } else {
    //   this.emptyCharacterReadyForDeletion = false;
    // }
  }

  delete() {
    // this.characterFacade.deleteCharacter(this.character);
  }
}
