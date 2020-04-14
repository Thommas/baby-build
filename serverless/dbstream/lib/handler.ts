/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { handleEvent } from './handlers/event.handler'

exports.handle = (event, context, callback) => {
  handleEvent(event, callback);
};
