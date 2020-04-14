/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IdeaFacade } from '../../../facade';
import { ConstantsService, FormService } from '../../../services';
import { map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-idea-show-cmp',
  templateUrl: './idea-show.component.html',
  styleUrls: ['./idea-show.component.scss']
})
export class IdeaShowComponent implements OnInit {
  @ViewChild('inputElement') inputElement: any;
  formGroup: FormGroup;
  formFieldSub: Subscription;
  selectedIdea$ = this.ideaFacade.selectedIdea$;

  constructor(
    public constantsService: ConstantsService,
    private formService: FormService,
    private ideaFacade: IdeaFacade
  ) {
    this.formGroup = new FormGroup({
      label: new FormControl('', []),
    });
  }

  ngOnInit() {
    const operator = map(() => this.save());
    this.formFieldSub = this.formService.getFormFieldSubscription(this.inputElement, operator);
    this.ideaFacade.selectedIdea$.pipe(
      tap(selectedIdea => {
        if (selectedIdea) {
          this.formGroup.patchValue(selectedIdea);
        }
      }),
    ).subscribe();
  }

  ngOnDestroy() {
    this.formFieldSub.unsubscribe();
  }

  selectIdea(idea?: any) {
    this.ideaFacade.selectIdea(idea);
  }

  save() {
    if (!this.formGroup.valid) {
      return;
    }
    const idea: any = clone(this.formGroup.value);
    this.ideaFacade.updateIdea(idea);
  }

  onKey(event: KeyboardEvent) {
    // FIXME
  }

  deleteIdea() {
    console.log('DELETE');
  }
}
