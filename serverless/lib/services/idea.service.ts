/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

 import { IDEA_IMGS_CONFIG } from '../config/idea.config';
 import { dynamoService, puppeteerService } from '../services';

export class IdeaService {
  async fetchImgs(idea: any) {
    const imgs = {};
    if (IDEA_IMGS_CONFIG[idea.category]) {
      for (const data of IDEA_IMGS_CONFIG[idea.category]) {
        const category = idea.category === 'videogame' && idea.platform ? idea.platform : idea.category;
        imgs[data.key] = await puppeteerService.fetchImgs(
          `"${idea.label}"+${category}+${data.searchInput}`,
          data.limit,
          data.getOriginal
        );
      }
    }
    return imgs;
  }

  async updateIdeaReleaseDate(idea: any) {
    console.log('updateIdeaReleaseDate', idea);
    if (idea.releaseDate) {
      return;
    }
    const category = idea.category === 'videogame' && idea.platform ? idea.platform : idea.category;
    await puppeteerService.fetchReleaseDate(`"${idea.label}"+${category}`)
      .then((releaseDate: number|null) => {
        console.log(`Release date ${releaseDate} found for idea: ${idea.label}`)
        if (releaseDate) {
          idea.releaseDate = releaseDate;
          return dynamoService.createDocument(idea);
        } else {
          idea.releaseDate = '????';
          return dynamoService.createDocument(idea);
        }
      });
  }

  async updateIdeaImgs(idea: any) {
    await this.fetchImgs(idea)
      .then((imgs: string[]) => {
        idea.imgs = imgs;
        idea.imgsReady = true;
        const platform = idea.category === 'videogame' && idea.platform ? idea.platform : '';
        const ideaLabel = `${idea.label} ${idea.category} ${platform}`;
        console.log(`Updated images for idea: ${ideaLabel}`)
        return dynamoService.createDocument(idea);
      });
  }

  async updateIdea(id: string) {
    const idea = await dynamoService.get(id);
    if (idea) {
      await this.updateIdeaReleaseDate(idea);
      // if (!idea.imgsReady) {
      //   this.updateIdeaImgs(idea);
      // }
    }
  }
}

export const ideaService = new IdeaService();
