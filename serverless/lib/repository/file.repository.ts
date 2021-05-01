/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { nanoid } from 'nanoid'
import { dynamoService, puppeteerService } from '../service';

class FileRepository {
  async create(args: any, userId: string) {
    const id = nanoid();
    return dynamoService.createDocument({
      id: `File-${id}`,
      userId,
      name: args.name,
      size: args.size,
      type: args.type,
      data: args.data,
    });
  }

  getFilesByIds(ids?: string[]) {
    if (!ids || 0 === ids.length) {
      return [];
    }
    return dynamoService.batchGet(ids);
  }

  async getFiles(args: any, userId: string) {
    const imgs = await puppeteerService.getFiles(args.fileInput.input);

    return this.storeFiles(imgs, userId);
  }

  async storeFiles(files: any, userId: string) {
    const fileIds = []
    for (let data of files) {
      const id = nanoid();
      const file: any = {
        id: `File-${id}`,
        data,
        type: 'image/png',
        size: data.length,
      };

      const fileId = await this.create(file, userId).then((file) => file.id);
      console.log('fileId', fileId);
      fileIds.push(fileId);
    }

    return fileIds;
  }
}

export const fileRepository = new FileRepository();
