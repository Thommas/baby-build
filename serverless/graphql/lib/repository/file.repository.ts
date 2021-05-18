/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { nanoid } from 'nanoid'
import { dynamoService, s3Service } from '../service';

class FileRepository {
  async create(args: any, userId: string) {
    const id = nanoid();
    return dynamoService.createDocument({
      id: `File-${id}`,
      userId,
      ...args,
    });
  }

  getFilesByIds(ids?: string[]) {
    if (!ids || 0 === ids.length) {
      return [];
    }
    return dynamoService.batchGet(ids);
  }

  async storeFiles(files: any, userId: string) {
    const fileIds = []
    for (let data of files) {
      const id = nanoid();
      const path = await s3Service.storeBase64File(id, data);
      console.log('path', path);
      const file: any = {
        id: `File-${id}`,
        path,
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
