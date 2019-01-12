/**
 * Path of child
 *
 * Elastic search - Handler
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { handleIdea } from './handlers/idea'

exports.idea = (event, context, callback) => {
  handleIdea(event, context, callback)
};
