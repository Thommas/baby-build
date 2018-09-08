/**
 * Path of child
 *
 * Component - Skill - Index
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import swal from 'sweetalert2';
import { clone } from 'lodash';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { GetSkills, GetBuild, CreateSkillMutation } from '../../../graphql';
import { UserService } from '../../../services';

@Component({
  selector: 'app-build-show-cmp',
  templateUrl: './build-show.component.html',
  styleUrls: ['./build-show.component.scss']
})
export class BuildShowComponent implements OnInit {
  loading: boolean;
  buildId: string;
  selectedSkill: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.buildId = null;
    this.selectedSkill = null;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getBuild(params.id);
    });
  }

  getBuild(buildId: string) {
    this.loading = true;
    this.apollo.watchQuery<any>({
      query: GetBuild,
      variables: {
        id: buildId
      }
    })
      .valueChanges
      .subscribe(
        ({ data, loading }) => {
          this.buildId = buildId;
          this.userService.setCurrentBuildId(this.buildId);
        },
        (e) => console.log(['/page-not-found'])
      )
  }

  addSkill() {
    if (!this.buildId) {
      return;
    }
    const skill = {
      buildId: this.buildId
    };
    this.apollo.mutate({
      mutation: CreateSkillMutation,
      variables: {
        buildId: this.buildId
      },
      refetchQueries: [{
        query: GetSkills,
        variables: {
          buildId: this.buildId
        }
      }]
    }).subscribe();
  }

  selectSkill(skill) {
    this.selectedSkill = skill;
  }
}
