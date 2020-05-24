/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WorldFacade } from '../../../facade';
import { ConstantsService, FormService } from '../../../services';
import { map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-world-show-cmp',
  templateUrl: './world-show.component.html',
  styleUrls: ['./world-show.component.scss']
})
export class WorldShowComponent implements OnInit {
  @ViewChild('inputElement') inputElement: any;
  formGroup: FormGroup;
  formFieldSub: Subscription;
  selectedWorld$ = this.worldFacade.selectedWorld$;

  constructor(
    public constantsService: ConstantsService,
    private formService: FormService,
    private worldFacade: WorldFacade
  ) {
    this.formGroup = new FormGroup({
      label: new FormControl('', []),
      category: new FormControl('', []),
      platform: new FormControl('', []),
      language: new FormControl('', []),
    });
  }

  ngOnInit() {
    const operator = map(() => this.save());
    this.formFieldSub = this.formService.getFormFieldSubscription(this.inputElement, operator);
    this.worldFacade.selectedWorld$.pipe(
      tap(selectedWorld => {
        if (selectedWorld) {
          this.formGroup.patchValue(selectedWorld);
        }
      }),
    ).subscribe();
  }

  ngOnDestroy() {
    this.formFieldSub.unsubscribe();
  }

  selectWorld(world?: any) {
    this.worldFacade.selectWorld(world);
  }

  save() {
    if (!this.formGroup.valid) {
      return;
    }
    const world: any = clone(this.formGroup.value);
    this.worldFacade.updateWorld(world);
  }

  onKey(event: KeyboardEvent) {
    // FIXME
  }

  deleteWorld() {
    this.worldFacade.deleteWorld();
  }

  selectCategory(category: string) {
    this.formGroup.patchValue({
      category
    });
    this.worldFacade.updateWorld({
      category,
    });
  }

  selectPlatform(platform: string) {
    this.formGroup.patchValue({
      platform
    });
    this.worldFacade.updateWorld({
      platform,
    });
  }

  selectLanguage(language: string) {
    this.formGroup.patchValue({
      language
    });
    this.worldFacade.updateWorld({
      language,
    });
  }
}
