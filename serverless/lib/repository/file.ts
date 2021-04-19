/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { nanoid } from 'nanoid'
import { dynamoService, puppeteerService } from '../services';

export function createFile(args: any, userId: string) {
  const Entity = dynamoService.getEntity();
  const id = nanoid();
  const newFile = new Entity({
    id: `File-${id}`,
    userId,
    name: args.name,
    size: args.size,
    type: args.type,
    data: args.data,
  });
  return newFile.save();
}

export function getFilesByIds(ids?: string[]) {
  if (!ids || 0 === ids.length) {
    return [];
  }
  const params = ids.map((id: string) => ({ id }));
  return dynamoService.getEntity().batchGet(params);
}

export function getFiles(args: any) {
  console.log('args', args);
  return puppeteerService.getFiles(args.fileInput.input);
}
