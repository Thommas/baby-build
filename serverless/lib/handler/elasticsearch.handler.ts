/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { elasticSearchService } from '../service';

export function handleInsert(document) {
  elasticSearchService.index(document);
}

export function handleModify(document) {
  elasticSearchService.index(document);
}

export function handleRemove(document) {
  elasticSearchService.remove(document);
}
