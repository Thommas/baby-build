/**
 * Path of child
 *
 * GraphQL - Resolvers - Item
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbItem from '../../dynamo/item';

export default {
  Query: {
    items: (_, args, context) => dbItem.getItems(args, context.userId),
  },
  Mutation: {
    createItem: (_, args, context) => dbItem.createItem(args, context.userId),
    updateItem: (_, args, context) => dbItem.updateItem(args, context.userId),
    deleteItem: (_, args, context) => dbItem.deleteItem(args, context.userId),
  }
};
