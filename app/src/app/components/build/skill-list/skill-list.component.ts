/**
 * Path of child
 *
 * Component - Skill - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import swal from 'sweetalert2';
import { clone } from 'lodash';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { GetSkills, GetBuild, CreateSkillMutation } from '../../../graphql';
import { UserService } from '../../../services';

@Component({
  selector: 'app-skill-list-cmp',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent implements OnInit, OnChanges {
  @Input('buildId') buildId: string;
  @Output('selectSkill') selectSkill: EventEmitter<any> = new EventEmitter<any>();
  loading: boolean;
  skills: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.buildId = null;
  }

  ngOnInit() {
    this.getSkills();
  }

  ngOnChanges() {
    console.log('ON CHANGES');
    this.getSkills();
  }

  getSkills() {
    this.loading = true;

    this.apollo.watchQuery<any>({
      query: GetSkills,
      fetchPolicy: 'network-only',
      variables: {
        buildId: this.buildId
      }
    })
      .valueChanges
      .subscribe(
        ({ data, loading }) => {
          this.loading = loading;
          this.skills = data.skills;
        },
        (e) => console.log('error while loading skills', e)
      )
  }
}
