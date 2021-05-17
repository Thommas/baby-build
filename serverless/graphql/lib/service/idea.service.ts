/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { fileRepository } from '../repository/file.repository';
import { dynamoService, puppeteerService } from '.';

export class IdeaService {
  async fetchIcons(idea: any) {
    if (idea.icons) {
      return;
    }
    const category = idea.category === 'videogame' && idea.platform ? idea.platform : idea.category;
    const icons = await puppeteerService.fetchImgs(
      `"${idea.label}"+${category}+${idea.label}`,
      10,
      false
    );
    const files = await fileRepository.storeFiles(icons, idea.userId);
    idea.icons = files;
    await dynamoService.createDocument(idea);
  }

  async fetchReleaseDate(idea: any) {
    if (idea.releaseDate) {
      return;
    }
    const category = idea.category === 'videogame' && idea.platform ? idea.platform : idea.category;
    await puppeteerService.fetchReleaseDate(`"${idea.label}"+${category}`)
      .then((releaseDate: number|null) => {
        console.log(`Release date ${releaseDate} found for idea: ${idea.label}`);
        idea.releaseDate = releaseDate ? releaseDate : '????';
        return dynamoService.createDocument(idea);
      });
  }

  async updateIdea(id: string) {
    const idea = await dynamoService.get(id);
    if (idea) {
      console.log('updateIdea', idea);
      await this.fetchReleaseDate(idea);
      await this.fetchIcons(idea);
    }
  }
}

export const ideaService = new IdeaService();
