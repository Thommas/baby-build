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
import 'url-search-params-polyfill';

const googleRecaptchaVerifyUrl = 'https://www.google.com/recaptcha/api/siteverify';

export function verify(token, ip) {
  const params = new URLSearchParams({
    secret: process.env.GOOGLE_RECAPTCHA_SECRET,
    response: token,
    remoteip: ip
  });

  return fetch(googleRecaptchaVerifyUrl, { method: 'POST', body: params })
  	.then(res => res.json())
  	.then(json => json.success);
}
