/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, Input, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IdeaFacade, IdeaSuggestFacade } from '../../../facade';
import { FormService } from '../../../services';
import { map } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

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
  categories: any[] = this.ideaFacade.categories;
  getCategoryIconByValue = this.ideaFacade.getCategoryIconByValue;

  constructor(
    private ideaFacade: IdeaFacade,
    private ideaSuggestFacade: IdeaSuggestFacade,
    private formService: FormService
  ) {
    this.emptyIdeaReadyForDeletion = false;
    this.idea = {};
    this.formGroup = new FormGroup({
      label: new FormControl('', []),
      category: new FormControl('', []),
    });
    this.formGroup.setValue({
      label: '',
      category: 'videogame',
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
      this.ideaSuggestFacade.setName(null);
      return;
    }
    const data: any = clone(this.formGroup.value);
    console.log('search', data.label);
    this.ideaSuggestFacade.setName(data.label);
  }

  create() {
    if (!this.formGroup.valid) {
      console.log('INVALID');
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
  }

  onKey(event: KeyboardEvent) {
    // FIXME
  }
}
