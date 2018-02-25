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
    whitelistItems: () => dbWhitelistItem.getWhitelistItems(),
    whitelistItem: (_, args) => dbWhitelistItem.getWhitelistItemById(args.id),
  },
  Mutation: {
    createWhitelistItem: (_, args) => dbWhitelistItem.createWhitelistItem(args),
    updateWhitelistItem: (_, args) => dbWhitelistItem.updateWhitelistItem(args),
    deleteWhitelistItem: (_, args) => dbWhitelistItem.deleteWhitelistItem(args),
  }
};
