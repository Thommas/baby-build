/**
 * Path of child
 *
 * Contact - Services - Google reCaptcha
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 *
 * @see https://developers.google.com/recaptcha/docs/verify
 */

import fetch from 'node-fetch';

const googleRecaptchaVerifyUrl = 'https://www.google.com/recaptcha/api/siteverify';

export function verify(token) {
  const body = {
    secret: process.env.GOOGLE_RECAPTCHA_SECRET,
    response: token,
    remoteip: event.requestContext.identity.sourceIp
  };

  return fetch(googleRecaptchaVerifyUrl, {
  	method: 'POST',
  	body:    JSON.stringify(body),
  	headers: { 'Content-Type': 'application/json' },
  })
  	.then(res => res.json())
  	.then(json => json.success);
}
