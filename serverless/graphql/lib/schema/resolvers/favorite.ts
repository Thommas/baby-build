/**
 * Path of child
 *
 * GraphQL - Resolvers - Favorite
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbFavorite from '../../dynamo/favorite';

export default {
  Query: {
    favorites: (_, args, context) => dbFavorite.getFavorites(args.build_id, args.child_year, context.user_id),
  },
  Mutation: {
    createFavorite: (_, args, context) => dbFavorite.createFavorite(args, context.user_id),
    updateFavorite: (_, args, context) => dbFavorite.updateFavorite(args, context.user_id),
    deleteFavorite: (_, args, context) => dbFavorite.deleteFavorite(args, context.user_id),
  }
};
