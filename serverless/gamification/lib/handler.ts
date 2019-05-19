/**
 * Path of child
 *
 * Gamification - Handler
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { handleBuild } from './handlers/build'
import { handleChild } from './handlers/child'
import { handleFavorite } from './handlers/favorite'

exports.build = (event, context, callback) => {
  handleBuild(event, context, callback)
};

exports.child = (event, context, callback) => {
  handleChild(event, context, callback)
};

exports.favorite = (event, context, callback) => {
  handleFavorite(event, context, callback)
};
