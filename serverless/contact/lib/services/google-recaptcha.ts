/**
 * Path of child
 *
 * Contact - Services - Google ReCaptcha
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as googleRecaptcha from 'google-recaptcha';

export function verify(event) {
  const captcha = new googleRecaptcha({
    secret: process.env.GOOGLE_RECAPTCHA_SECRET
  });

  let captchaResponse = event.body.captchaResponse;

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Captcha correct',
      input: event,
    }),
  };

  captcha.verify({response: captchaResponse}, (error) => {
    if (error) {
      callback(error);
    }

    callback(null, response);
  })
}
