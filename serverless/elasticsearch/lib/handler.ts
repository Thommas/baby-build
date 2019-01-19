/**
 * Path of child
 *
 * Elastic search - Handler
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { handleEvent } from './handlers/event.handler'

exports.idea = (event, context, callback) => {
  handleEvent(event, context, callback, 'idea');
};
