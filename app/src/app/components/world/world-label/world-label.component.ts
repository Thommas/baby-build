/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WorldFacade } from '../../../facade';
import { FormService } from '../../../services';
import { map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-world-label-cmp',
  templateUrl: './world-label.component.html',
  styleUrls: ['./world-label.component.scss']
})
export class WorldLabelComponent implements OnInit {
  @ViewChild('inputElement') inputElement: any;
  formGroup: FormGroup;
  formFieldSub: Subscription;
  world$ = this.worldFacade.world$;

  constructor(
    private formService: FormService,
    private worldFacade: WorldFacade
  ) {
    this.formGroup = new FormGroup({
      label: new FormControl('', []),
    });
  }

  ngOnInit() {
    const operator = map(() => this.save());
    this.formFieldSub = this.formService.getFormFieldSubscription(this.inputElement, operator);
    this.worldFacade.world$.pipe(
      tap(world => {
        if (world) {
          console.log('world', world);
          this.formGroup.patchValue(world);
        }
      }),
    ).subscribe();
  }

  ngOnDestroy() {
    this.formFieldSub.unsubscribe();
  }

  onKey(event: KeyboardEvent) {
    // FIXME
  }

  save() {
    if (!this.formGroup.valid) {
      return;
    }
    const world: any = clone(this.formGroup.value);
    this.worldFacade.updateWorld(world);
  }
}
