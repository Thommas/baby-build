/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IdeaFacade, IdeaSuggestFacade } from '../../../facade';
import { ConstantsService, FormService } from '../../../services';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-idea-create-cmp',
  templateUrl: './idea-create.component.html',
  styleUrls: ['./idea-create.component.scss']
})
export class IdeaCreateComponent implements OnInit {
  @Input() idea: any;
  @ViewChild('inputElement') inputElement: any;
  formGroup: FormGroup;
  loading: boolean;
  emptyIdeaReadyForDeletion: boolean;
  formFieldSub: Subscription;
  suggestedIdeas$: any;
  newIdeas: any[] = this.ideaFacade.newIdeas;

  constructor(
    public constantsService: ConstantsService,
    private ideaFacade: IdeaFacade,
    private ideaSuggestFacade: IdeaSuggestFacade,
    private formService: FormService
  ) {
    this.emptyIdeaReadyForDeletion = false;
    this.idea = {};
    this.formGroup = new FormGroup({
      label: new FormControl('', []),
      category: new FormControl('', []),
      platform: new FormControl('', []),
    });
    this.formGroup.setValue({
      label: '',
      category: 'videogame',
      platform: 'atari-st',
    });
    this.suggestedIdeas$ = this.ideaFacade.suggestedIdeas$;
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
      this.ideaSuggestFacade.set({
        name: null,
        category: null,
      });
      return;
    }
    const data: any = clone(this.formGroup.value);
    this.ideaSuggestFacade.set({
      name: data.label,
      category: data.category,
    });
  }

  create() {
    if (!this.formGroup.valid) {
      return;
    }
    const idea: any = clone(this.formGroup.value);
    this.ideaFacade.createIdea(idea);
    this.formGroup.patchValue({
      label: '',
    });
  }

  selectCategory(value: string) {
    this.formGroup.patchValue({
      'category': value,
    });
    if (value != 'videogame') {
      this.formGroup.patchValue({
        'platform': null,
      });
    }
  }

  selectPlatform(value: string) {
    this.formGroup.patchValue({
      'platform': value,
    });
  }

  onKey(event: KeyboardEvent) {
    // FIXME
  }

  focusInput() {
    this.inputElement.nativeElement.focus();
  }
}
