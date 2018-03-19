/**
 * Path of child
 *
 * Contact - Handlers
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { handleContact } from './contact'

describe('Handlers', function() {
  it('contact', function() {
    const event = {}
    const context = {}
    const callback = () => {}
    handleContact(event, context, callback)
  });
});
