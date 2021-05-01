/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { fileRepository } from '../repository/file.repository';
import { dynamoService, puppeteerService } from '.';

export class IdeaService {
  async updateIdeaImgs(idea: any) {
    if (idea.imgs) {
      return;
    }
    const category = idea.category === 'videogame' && idea.platform ? idea.platform : idea.category;
    const imgs = await puppeteerService.fetchImgs(
      `"${idea.label}"+${category}+${idea.label}`,
      10,
      false
    );
    const files = await fileRepository.storeFiles(imgs, idea.userId);
    idea.imgs = files;
    await dynamoService.createDocument(idea);
  }

  async updateIdeaReleaseDate(idea: any) {
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
      await this.updateIdeaReleaseDate(idea);
      await this.updateIdeaImgs(idea);
    }
  }
}

export const ideaService = new IdeaService();
