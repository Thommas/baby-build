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
    whitelistItems: (_, args) => dbWhitelistItem.getWhitelistItems(args.category),
    whitelistItem: (_, args) => dbWhitelistItem.getWhitelistItemById(args.id),
  },
  Mutation: {
    createWhitelistItem: (_, args, context) => dbWhitelistItem.createWhitelistItem(args, context.user_id),
    updateWhitelistItem: (_, args) => dbWhitelistItem.updateWhitelistItem(args),
    deleteWhitelistItem: (_, args) => dbWhitelistItem.deleteWhitelistItem(args),
  }
};
