/**
 * Path of child
 *
 * Contact - Services - Google ReCaptcha
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { verify } from './google-recaptcha'

describe('Services', function() {
  it('Google ReCaptcha', function() {
    const event = {}
    verify(event)
  });
});
