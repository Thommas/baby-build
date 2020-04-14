/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class FormService {
  /**
   * Listen for form field change after 800ms
   */
  getInputElementObs(inputElement: any) {
    return fromEvent(inputElement.nativeElement, 'input').pipe(
      map((e: { target: HTMLInputElement }) => e.target.value),
      debounceTime(800),
      distinctUntilChanged()
    );
  }

  /**
   * Listen for form field change after 800ms
   */
  getFormFieldObs(inputElement: any, operator?: any) {
    if (operator) {
      return this.getInputElementObs(inputElement).pipe(operator);
    }

    return this.getInputElementObs(inputElement);
  }

  /**
   * Listen for form field change after 800ms
   */
  getFormFieldSubscription(inputElement: any, operator?: any) {
    return this.getFormFieldObs(inputElement, operator).subscribe();
  }
}
