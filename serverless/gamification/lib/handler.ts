/**
 * Path of child
 *
 * Gamification - Handler
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

exports.build = (event, context, callback) => {
  console.log('event', event);
  console.log('context', context);
  callback('plop');
};
