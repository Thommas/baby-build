/**
 * Path of child
 *
 * GraphQL - Dynamo - Item
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import generate = require('nanoid/generate');
import Item from '../model/item';

export function getItems(args, userId) {
  const params: any = {
    childId: {eq: args.childId},
    userId: {eq: userId}
  };
  return Item.scan(params).exec();
}

export function createItem(args, userId) {
  const item = new Item({
    id: generate('0123456789', 20),
    userId: userId,
    ...args
  });
  return item.save();
}

export function updateItem(args, userId) {
  return Item.get(args.id)
    .then((item: any) => {
      if (!item) {
        throw new Error('Item not found');
      }
      if (args.label) {
        item.label = args.label;
      }
      if (args.description) {
        item.description = args.description;
      }
      return item.save();
    });
}

export function deleteItem(args, userId) {
  return Item.get(args.id)
    .then((item: any) => {
      if (!item) {
        throw new Error('Item not found');
      }
      return item.delete();
    });
}
