/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { dynamoService } from '../services';

export function getFiles(ids: string[]) {
  if (0 === ids.length) {
    return [];
  }
  const params = ids.map((id: string) => ({ id }));
  return dynamoService.getEntity().batchGet(params);
}
