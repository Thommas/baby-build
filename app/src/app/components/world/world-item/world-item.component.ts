/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, Input, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WorldFacade, UserFacade } from '../../../facade';
import { ConstantsService, FormService } from '../../../services';
import { map } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-world-item-cmp',
  templateUrl: './world-item.component.html',
  styleUrls: ['./world-item.component.scss']
})
export class WorldItemComponent implements OnInit, OnChanges {
  @Input() world: any;
  @ViewChild('inputElement') inputElement: any;
  formGroup: FormGroup;
  loading: boolean;
  emptyWorldReadyForDeletion: boolean;
  formFieldSub: Subscription;

  constructor(
    public constantsService: ConstantsService,
    public worldFacade: WorldFacade,
    private userFacade: UserFacade,
    private formService: FormService
  ) {
    this.emptyWorldReadyForDeletion = false;
    this.world = {};
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
    // if (changes.world && changes.world.previousValue) {
    //   this.save();
    // }
    // if (changes.world) {
    //   if (changes.world.currentValue) {
    //     const world: any = changes.world.currentValue;
    //     this.formGroup.setValue({
    //       id: world.id,
    //       label: world.label,
    //       icon: world.icon,
    //       requiredAge: world.requiredAge,
    //       score: world.score,
    //     });
    //     if (!world.label || world.label.length === 0) {
    //       this.emptyWorldReadyForDeletion = true;
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
    // const world: any = clone(this.formGroup.value);
    // this.worldFacade.updateWorld(world);
  }

  onKey(event: KeyboardEvent) {
    // if (!this.formGroup.get('label').value || this.formGroup.get('label').value.length === 0) {
    //   if (this.emptyWorldReadyForDeletion) {
    //     this.delete();
    //   } else {
    //     this.emptyWorldReadyForDeletion = true;
    //   }
    // } else {
    //   this.emptyWorldReadyForDeletion = false;
    // }
  }

  delete() {
    // this.worldFacade.deleteWorld(this.world);
  }
}
