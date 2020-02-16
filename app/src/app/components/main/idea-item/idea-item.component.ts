/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, Input, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IdeaFacade, UserFacade } from '../../../facade';
import { FormService } from '../../../services';
import { map } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-idea-item-cmp',
  templateUrl: './idea-item.component.html',
  styleUrls: ['./idea-item.component.scss']
})
export class IdeaItemComponent implements OnInit, OnChanges {
  @Input() idea: any;
  @ViewChild('inputElement') inputElement: any;
  formGroup: FormGroup;
  loading: boolean;
  emptyIdeaReadyForDeletion: boolean;
  formFieldSub: Subscription;

  constructor(
    private ideaFacade: IdeaFacade,
    private userFacade: UserFacade,
    private formService: FormService
  ) {
    this.emptyIdeaReadyForDeletion = false;
    this.idea = {};
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
    // if (changes.idea && changes.idea.previousValue) {
    //   this.save();
    // }
    // if (changes.idea) {
    //   if (changes.idea.currentValue) {
    //     const idea: any = changes.idea.currentValue;
    //     this.formGroup.setValue({
    //       id: idea.id,
    //       label: idea.label,
    //       icon: idea.icon,
    //       requiredAge: idea.requiredAge,
    //       score: idea.score,
    //     });
    //     if (!idea.label || idea.label.length === 0) {
    //       this.emptyIdeaReadyForDeletion = true;
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
    // const idea: any = clone(this.formGroup.value);
    // this.ideaFacade.updateIdea(idea);
  }

  onKey(event: KeyboardEvent) {
    // if (!this.formGroup.get('label').value || this.formGroup.get('label').value.length === 0) {
    //   if (this.emptyIdeaReadyForDeletion) {
    //     this.delete();
    //   } else {
    //     this.emptyIdeaReadyForDeletion = true;
    //   }
    // } else {
    //   this.emptyIdeaReadyForDeletion = false;
    // }
  }

  delete() {
    // this.ideaFacade.deleteIdea(this.idea);
  }

  getIcon(score: string) {
    if (score === '-3') {
      return '/assets/img/tier/tier-d.png';
    }
    if (score === '-2') {
      return '/assets/img/tier/tier-c.png';
    }
    if (score === '-1') {
      return '/assets/img/tier/tier-b.png';
    }
    if (score === '0') {
      return '/assets/img/tier/tier-a.png';
    }
    if (score === '1') {
      return '/assets/img/tier/tier-s.png';
    }
    if (score === '2') {
      return '/assets/img/tier/tier-ss.png';
    }
    if (score === '3') {
      return '/assets/img/tier/tier-sss.png';
    }
    return '';
  }
}
