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

exports.favorite = (event, context, callback) => {
  handleFavorite(event, context, callback)
};

exports.goal = (event, context, callback) => {
  handleGoal(event, context, callback)
};

exports.quest = (event, context, callback) => {
  handleQuest(event, context, callback)
};

exports.reward = (event, context, callback) => {
  handleReward(event, context, callback)
};
