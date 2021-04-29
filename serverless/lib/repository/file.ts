/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { nanoid } from 'nanoid'
import { dynamoService, puppeteerService } from '../services';

export function createFile(args: any, userId: string) {
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

export function getFilesByIds(ids?: string[]) {
  if (!ids || 0 === ids.length) {
    return [];
  }
  return dynamoService.batchGet(ids);
}

export function getFiles(args: any) {
  console.log('args', args);
  return puppeteerService.getFiles(args.fileInput.input);
}
