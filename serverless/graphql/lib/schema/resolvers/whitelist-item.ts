/**
 * Path of child
 *
 * GraphQL - Resolvers - Whitelist Item
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbWhitelistItem from '../../dynamo/whitelist-item';

export default {
  Query: {
    whitelistItems: (_, args, context) => dbWhitelistItem.getWhitelistItems(args.build_id, args.child_year, context.user_id),
  },
  Mutation: {
    createWhitelistItem: (_, args, context) => dbWhitelistItem.createWhitelistItem(args, context.user_id),
    updateWhitelistItem: (_, args, context) => dbWhitelistItem.updateWhitelistItem(args, context.user_id),
    deleteWhitelistItem: (_, args, context) => dbWhitelistItem.deleteWhitelistItem(args, context.user_id),
  }
};
