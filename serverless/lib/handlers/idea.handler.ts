/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { sqsService } from '../services/sqs.service';

export function handleInsert(document) {
  if ('Idea' !== document.id.split('-')[0]) {
    return;
  }
  sqsService.sendMessage({
    id: document.id
  });
  // updateIdea(document);
}

export function handleModify(document) {
  if ('Idea' !== document.id.split('-')[0]) {
    return;
  }
  sqsService.sendMessage({
    id: document.id
  });
  //updateIdea(document);
}
