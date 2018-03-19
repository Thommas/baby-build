/**
 * Path of child
 *
 * Contact - Services - SES
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { sendEmail } from './ses'

describe('Services', function() {
  it('SES', function() {
    const event = {}
    const context = {}
    const callback = () => {}
    sendEmail(event, context, callback)
  });
});
