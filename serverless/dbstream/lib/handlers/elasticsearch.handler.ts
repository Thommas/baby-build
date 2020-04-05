/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { index, remove } from '../services';

export function handleInsert(document) {
  index(document);
}

export function handleModify(document) {
  index(document);
}

export function handleRemove(document) {
  remove(document);
}
