/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { clone } from 'lodash';
import { Component, Input, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IdeaFacade, UserFacade } from '../../../facade';

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

  constructor(
    private ideaFacade: IdeaFacade,
    private userFacade: UserFacade
  ) {
    this.emptyIdeaReadyForDeletion = false;
    this.idea = {};
    this.formGroup = new FormGroup({
      id: new FormControl('', [Validators.required]),
      label: new FormControl('', []),
      icon: new FormControl('', []),
    });
    this.formGroup.setValue({
      id: null,
      label: '',
      icon: null,
    });
  }

  ngOnInit() {
    fromEvent(this.inputElement.nativeElement, 'input').pipe(
      map((e: { target: HTMLInputElement }) => e.target.value),
      debounceTime(800),
      distinctUntilChanged(),
    ).subscribe(data => this.save());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.idea && changes.idea.previousValue) {
      this.save();
    }
    if (changes.idea) {
      if (changes.idea.currentValue) {
        const idea: any = changes.idea.currentValue;
        this.formGroup.setValue({
          id: idea.id,
          label: idea.label,
          icon: idea.icon,
        });
        if (!idea.label || idea.label.length === 0) {
          this.emptyIdeaReadyForDeletion = true;
        }
      } else {
        this.formGroup.setValue({
          id: null,
          label: '',
          icon: null,
        });
      }
    }
  }

  save() {
    if (!this.formGroup.valid) {
      return;
    }
    const idea: any = clone(this.formGroup.value);
    this.ideaFacade.updateIdea(idea);
  }

  onKey(event: KeyboardEvent) {
    if (!this.formGroup.get('label').value || this.formGroup.get('label').value.length === 0) {
      if (this.emptyIdeaReadyForDeletion) {
        this.delete();
      } else {
        this.emptyIdeaReadyForDeletion = true;
      }
    } else {
      this.emptyIdeaReadyForDeletion = false;
    }
  }

  delete() {
    this.ideaFacade.deleteIdea(this.idea);
  }
}
