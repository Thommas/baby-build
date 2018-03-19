/**
 * Path of child
 *
 * Contact - Handlers
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

export function handleContact(event, context, callback) {
  console.log('event', event);

  callback(null, `Successfully received contact.`);
}
