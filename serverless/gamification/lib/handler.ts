/**
 * Path of child
 *
 * Gamification - Handler
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { handleBuild } from './handlers/build'
import { handleChild } from './handlers/child'
import { handleWhitelistItem } from './handlers/whitelist-item'

exports.build = (event, context, callback) => {
  handleBuild(event, context, callback)
};

exports.child = (event, context, callback) => {
  handleChild(event, context, callback)
};

exports.whitelistItem = (event, context, callback) => {
  handleWhitelistItem(event, context, callback)
};
