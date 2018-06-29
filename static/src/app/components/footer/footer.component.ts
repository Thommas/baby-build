/**
 * Path of child
 *
 * Component - Footer
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Inject, LOCALE_ID } from '@angular/core';
import { LocaleService } from '../../../services';

@Component({
  selector: 'app-footer-cmp',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  /**
   * Constructor
   */
  constructor(
    @Inject(LOCALE_ID) private _locale: string,
    public localeService: LocaleService
  ) {}
}
