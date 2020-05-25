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
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-world-show-cmp',
  templateUrl: './world-show.component.html',
  styleUrls: ['./world-show.component.scss']
})
export class WorldShowComponent implements OnInit {
  @ViewChild('inputElement') inputElement: any;
  world$: any = this.worldFacade.world$;
  formGroup: FormGroup;
  formFieldSub: Subscription;
  selectedWorld$ = this.worldFacade.selectedWorld$;

  constructor(
    private route: ActivatedRoute,
    public constantsService: ConstantsService,
    private formService: FormService,
    private worldFacade: WorldFacade
  ) {
    this.formGroup = new FormGroup({
      label: new FormControl('', []),
    });
  }

  ngOnInit() {
    // const operator = map(() => this.save());
    // this.formFieldSub = this.formService.getFormFieldSubscription(this.inputElement, operator);
    // this.worldFacade.selectedWorld$.pipe(
    //   tap(selectedWorld => {
    //     if (selectedWorld) {
    //       this.formGroup.patchValue(selectedWorld);
    //     }
    //   }),
    // ).subscribe();
    this.route.params.subscribe(params => {
      this.worldFacade.getWorldById(params.id);
    });
  }

  ngOnDestroy() {
    // this.formFieldSub.unsubscribe();
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

  drop(event: CdkDragDrop<string[]>) {
    console.log('event', event);
  }
}
