/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { SharingFacade, UserFacade } from '../../../facade';
import { FormService } from '../../../services';

@Component({
  selector: 'app-user-sharing-cmp',
  templateUrl: './user-sharing.component.html',
  styleUrls: ['./user-sharing.component.scss']
})
export class UserSharingComponent implements OnInit {
  @ViewChild('inputElement') inputElement: any;
  users$: Observable<any>;
  sharings$ = this.sharingFacade.sharings$;

  constructor(
    private formService: FormService,
    private sharingFacade: SharingFacade,
    private userFacade: UserFacade
  ) {}

  ngOnInit() {
    const operator = mergeMap((value: any) => {
      return this.userFacade.getUsersBySearchQuery(value).pipe(
        map((res: any) => res.data.users)
      );
    });
    this.users$ = this.formService.getFormFieldObs(this.inputElement, operator);
  }

  optionSelected(option: any) {
    const userId: string = option.option.value;
    this.sharingFacade.createSharing(userId);
  }

  deleteSharing(sharingId: string) {
    this.sharingFacade.deleteSharing(sharingId);
  }
}
