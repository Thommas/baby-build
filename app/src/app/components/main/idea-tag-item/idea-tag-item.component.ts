/**
 * Path of child
 *
 * Component - Idea Tag Item
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Component, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { GetIdeaTags, DeleteIdeaTagMutation } from '../../../graphql';

@Component({
  selector: 'app-idea-tag-item-cmp',
  templateUrl: './idea-tag-item.component.html',
  styleUrls: ['./idea-tag-item.component.scss']
})
export class IdeaTagItemComponent {
  @Input() ideaTag: any;
  @Input() idea: any;
  loading: boolean;

  constructor(private apollo: Apollo) {}

  deleteIdeaTag() {
    this.apollo.mutate({
      mutation: DeleteIdeaTagMutation,
      variables: {
        id: this.ideaTag.id,
      },
      update: (store, { data: { deleteIdeaTag } }) => {
        if (!deleteIdeaTag) {
          return;
        }
        const query: any = store.readQuery({ query: GetIdeaTags, variables: { ideaId: this.idea.id } });
        const ideaTags: any[] = query.ideaTags.filter((ideaTag: any) => ideaTag.id !== deleteIdeaTag.id);
        store.writeQuery({ query: GetIdeaTags, variables: { ideaId: this.idea.id }, data: { ideaTags }});
      }
    }).subscribe();
  }
}
