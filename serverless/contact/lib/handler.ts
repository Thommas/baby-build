/**
 * Path of child
 *
 * Contact - Handler
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { handleContact } from './handlers/contact'

exports.contact = (event, context, callback) => {
  handleContact(event, context, callback)
};
