/**
 * Path of child
 *
 * Contact - Handlers - Contact
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { verify } from '../services/google-recaptcha';
import { sendEmail } from '../services/ses';

export function handleContact(event, context, callback) {
  const data = JSON.parse(event.body);

  await tokenVerification = verify(data.token);

  if (!tokenVerification) {
    return callback('Invalid token');
  }

  sendEmail(data).then(data => {
    callback(null, `Successfully received contact: ${data.MessageId}`);
  }).catch(err => {
    console.error(err, err.stack);
    callback(err);
  });
}
