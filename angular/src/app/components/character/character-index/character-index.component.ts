/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { CharacterFacade, FileFacade } from '../../../facade';
import { ConstantsService } from '../../../services';

@Component({
  selector: 'app-character-index-cmp',
  templateUrl: './character-index.component.html',
  styleUrls: ['./character-index.component.scss']
})
export class CharacterIndexComponent {
  displayFilters: boolean;
  selectedCharacter$ = this.characterFacade.selectedCharacter$;
  files$ = this.fileFacade.files$;
  @ViewChild('btn') button: ElementRef;
  @ViewChild('inputElement') inputElement: ElementRef;
  buttonSubscription: Subscription;
  inputObs;

  constructor(
    public constantsService: ConstantsService,
    private characterFacade: CharacterFacade,
    private fileFacade: FileFacade
  ) {
    this.displayFilters = false;
  }

  selectCharacter(character?: any) {
    this.characterFacade.selectCharacter(character);
  }

  toggleFilters() {
    this.displayFilters = !this.displayFilters;
  }

  selectCategory(category: string) {
    this.characterFacade.updateCharacter({
      category
    });
  }

  refreshList() {
    this.characterFacade.characterQuery.refetch();
  }

  ngAfterViewInit() {
    this.buttonClick();
  }

  buttonClick() {
    this.inputObs = fromEvent(this.inputElement.nativeElement, 'input').pipe(
      map((e: { target: HTMLInputElement }) => e.target.value),
      debounceTime(100),
      distinctUntilChanged()
    );
    this.buttonSubscription = fromEvent(this.button.nativeElement, 'click')
      .pipe(
        debounceTime(100),
        withLatestFrom(this.inputObs),
        tap((res: any) => this.setFilesInput(res[1])),
      ).subscribe();
  }

  setFilesInput(input: string) {
    this.fileFacade.setFileInput(input);
  }

  ngOnDestroy() {
    this.buttonSubscription.unsubscribe();
  }
}
