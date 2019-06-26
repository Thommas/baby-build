/**
 * Path of child
 *
 * Component - Idea Tag List
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';
import { IdeaFacade, IdeaTagFacade, TagFacade } from '../../../facade';

@Component({
  selector: 'app-idea-tag-list-cmp',
  templateUrl: './idea-tag-list.component.html',
  styleUrls: ['./idea-tag-list.component.scss']
})
export class IdeaTagListComponent {
  @ViewChild('inputElement') inputElement: any;
  tags$: Observable<any>;
  selectedIdea$ = this.ideaFacade.selectedIdea$;
  ideaTags$ = this.ideaTagFacade.ideaTags$;

  constructor(
    private ideaFacade: IdeaFacade,
    private ideaTagFacade: IdeaTagFacade,
    private tagFacade: TagFacade
  ) {
  }

  ngOnInit() {
    this.tags$ = fromEvent(this.inputElement.nativeElement, 'input').pipe(
      map((e: { target: HTMLInputElement }) => e.target.value),
      filter((value: string) => value.length > 2),
      debounceTime(800),
      distinctUntilChanged(),
      mergeMap((value: any) => {
        return this.tagFacade.getTagsByLabel(value);
      }),
    );
  }

  optionSelected(event: any) {
    this.inputElement.nativeElement.value = '';
    const tag: any = event.option.value;
    this.ideaTagFacade.createIdeaTag(tag);
  }
}
