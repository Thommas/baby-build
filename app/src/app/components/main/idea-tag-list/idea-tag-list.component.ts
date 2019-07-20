/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IdeaFacade, IdeaTagFacade, TagFacade } from '../../../facade';
import { FormService } from '../../../services';

@Component({
  selector: 'app-idea-tag-list-cmp',
  templateUrl: './idea-tag-list.component.html',
  styleUrls: ['./idea-tag-list.component.scss']
})
export class IdeaTagListComponent implements OnInit {
  @ViewChild('inputElement') inputElement: any;
  tags$: Observable<any>;
  selectedIdea$ = this.ideaFacade.selectedIdea$;
  ideaTags$ = this.ideaTagFacade.ideaTags$;

  constructor(
    private formService: FormService,
    private ideaFacade: IdeaFacade,
    private ideaTagFacade: IdeaTagFacade,
    private tagFacade: TagFacade
  ) {
  }

  ngOnInit() {
    const operator = mergeMap((value: any) => {
      if (0 === value.length) {
        return of([]);
      }
      return this.tagFacade.getTagsByLabel(value);
    });
    this.tags$ = this.formService.getFormFieldObs(this.inputElement, operator);
  }

  optionSelected(event: any) {
    this.inputElement.nativeElement.value = '';
    const tag: any = event.option.value;
    this.ideaTagFacade.createIdeaTag(tag);
  }
}
