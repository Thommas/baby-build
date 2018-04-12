/**
 * Path of child
 *
 * Count - Handler
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { handleFavorite } from './handlers/favorite'
import { handleGoal } from './handlers/goal'
import { handleQuest } from './handlers/quest'
import { handleReward } from './handlers/reward'

exports.handleFavorite = (event, context, callback) => {
  handleFavorite(event, context, callback)
};

exports.handleGoal = (event, context, callback) => {
  handleGoal(event, context, callback)
};

exports.handleQuest = (event, context, callback) => {
  handleQuest(event, context, callback)
};

exports.handleReward = (event, context, callback) => {
  handleReward(event, context, callback)
};
