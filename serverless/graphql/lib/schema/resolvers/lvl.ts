/**
 * Path of child
 *
 * GraphQL - Resolvers - Lvl
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbLvl from '../../dynamo/lvl';

export default {
  Query: {
    lvls: (_, args, context) => dbLvl.getLvls(args, context.userId),
  },
  Mutation: {
    createLvl: (_, args, context) => dbLvl.createLvl(args, context.userId),
    updateLvl: (_, args, context) => dbLvl.updateLvl(args, context.userId),
    deleteLvl: (_, args, context) => dbLvl.deleteLvl(args, context.userId),
  }
};
