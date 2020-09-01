/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { WorldFacade, WorldFiltersFacade } from '../../../facade';
import { ConstantsService, FormService } from '../../../services';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-world-list-filters-cmp',
  templateUrl: './world-list-filters.component.html',
  styleUrls: ['./world-list-filters.component.scss']
})
export class WorldListFiltersComponent implements OnInit, OnDestroy {
  @ViewChild('inputElement') inputElement: any;
  filters$ = this.worldFiltersFacade.filters$;
  formFieldSub: Subscription;

  constructor(
    public constantsService: ConstantsService,
    public worldFacade: WorldFacade,
    private formService: FormService,
    private worldFiltersFacade: WorldFiltersFacade
  ) {
  }

  ngOnInit() {
    const operator = map((value: any) => this.selectLabel(value));
    this.formFieldSub = this.formService.getFormFieldSubscription(this.inputElement, operator);
  }

  ngOnDestroy() {
    this.formFieldSub.unsubscribe();
  }

  selectLabel(label: string) {
    this.worldFiltersFacade.selectLabel(label);
  }
}
