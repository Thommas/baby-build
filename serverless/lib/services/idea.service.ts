/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

 import { IDEA_IMGS_CONFIG } from '../config/idea.config';
 import { dynamoService, puppeteerService } from '../services';

export class IdeaService {
  async fetchImgs(document: any) {
    const imgs = {};
    if (IDEA_IMGS_CONFIG[document.category]) {
      for (const data of IDEA_IMGS_CONFIG[document.category]) {
        const category = document.category === 'videogame' && document.platform ? document.platform : document.category;
        imgs[data.key] = await puppeteerService.fetchImgs(
          `"${document.label}"+${category}+${data.searchInput}`,
          data.limit,
          data.getOriginal
        );
      }
    }
    return imgs;
  }

  updateIdeaReleaseDate(document: any) {
    if (document.releaseDate) {
      return;
    }
    return dynamoService.get(document.id)
      .then((entity: any) => {
        if (!entity) {
          throw new Error('Idea not found');
        }
        const category = document.category === 'videogame' && document.platform ? document.platform : document.category;
        return puppeteerService.fetchReleaseDate(`"${document.label}"+${category}`)
          .then((releaseDate: number|null) => {
            console.log(`Release date ${releaseDate} found for idea: ${document.label}`)
            if (releaseDate) {
              entity.releaseDate = releaseDate;
              return dynamoService.persist(entity);
            } else {
              entity.releaseDate = '????';
              return dynamoService.persist(entity);
            }
          });
      })
  }

  async updateIdeaImgs(idea: any) {
    await this.fetchImgs(document)
      .then((imgs: string[]) => {
        idea.imgs = imgs;
        idea.imgsReady = true;
        const platform = idea.category === 'videogame' && idea.platform ? idea.platform : '';
        const ideaLabel = `${idea.label} ${idea.category} ${platform}`;
        console.log(`Updated images for idea: ${ideaLabel}`)
        return dynamoService.persist(idea);
      });
  }

  async updateIdea(id: string) {
    const idea = dynamoService.get(id);
    if (idea) {
      await this.updateIdeaReleaseDate(idea);
      // if (!idea.imgsReady) {
      //   this.updateIdeaImgs(idea);
      // }
    }
  }
}

export const ideaService = new IdeaService();
