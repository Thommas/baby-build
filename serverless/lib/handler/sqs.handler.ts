/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { ideaService } from "../service";

export async function handleSQS(event, callback) {
  console.log('event', event);
  for (const record of event.Records) {
    const document = JSON.parse(record.body);
    const id = document.id;
    if ('Idea' !== id.split('-')[0]) {
      continue;
    }
    await ideaService.updateIdea(id);
  }
  callback(null, `Successfully processed ${event.Records.length} records.`);
}
