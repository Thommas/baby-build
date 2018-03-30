/**
 * Path of child
 *
 * Service - SEO
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';

@Injectable()
export class SeoService {
  /**
   * Constructor
   */
  constructor(
    private metaService: Meta,
    private titleService: Title,
    private translateService: TranslateService
  ) {}

  /**
   * Set page title and tags
   */
  setPage(pageIdentifier) {
    this.translateService.get(`seo.${pageIdentifier}`).subscribe(
      meta => {
        this.titleService.setTitle(meta.title);
        this.metaService.updateTag(
          { name: 'description', content: meta.description }
        );
        this.metaService.updateTag(
          { name: 'og:image', content: meta['og:image'] }
        );
        this.metaService.updateTag(
          { name: 'og:title', content: meta['og:title'] }
        );
        this.metaService.updateTag(
          { name: 'og:site_name', content: meta['og:site_name'] }
        );
        this.metaService.updateTag(
          { name: 'og:description', content: meta.description }
        );
        this.metaService.updateTag(
          { name: 'twitter:card', content: meta['twitter:card'] }
        );
      }
    );
    this.metaService.addTags([
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://' + environment.baseDomainUrl },
      { name: 'twitter:site', content: '@pathofchild' }
    ]);
  }
}
