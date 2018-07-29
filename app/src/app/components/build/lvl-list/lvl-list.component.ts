/**
 * Path of child
 *
 * Component - Lvl - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import swal from 'sweetalert2';
import { clone } from 'lodash';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { GetLvls, GetBuild, CreateLvlMutation } from '../../../graphql';
import { UserService } from '../../../services';

@Component({
  selector: 'app-lvl-list-cmp',
  templateUrl: './lvl-list.component.html',
  styleUrls: ['./lvl-list.component.scss']
})
export class LvlListComponent implements OnInit, OnChanges {
  @Input('skillId') skillId: string;
  @Output('selectLvl') selectLvl: EventEmitter<any> = new EventEmitter<any>();
  loading: boolean;
  lvls: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.skillId = null;
  }

  ngOnInit() {
    this.getLvls();
  }

  ngOnChanges() {
    console.log('ON CHANGES');
    this.getLvls();
  }

  getLvls() {
    this.loading = true;

    this.apollo.watchQuery<any>({
      query: GetLvls,
      fetchPolicy: 'network-only',
      variables: {
        skillId: this.skillId
      }
    })
      .valueChanges
      .subscribe(
        ({ data, loading }) => {
          this.loading = loading;
          this.lvls = data.lvls;
        },
        (e) => console.log('error while loading lvls', e)
      )
  }
}
