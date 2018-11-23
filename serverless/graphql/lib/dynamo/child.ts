/**
 * Path of child
 *
 * GraphQL - Dynamo - Child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import generate = require('nanoid/generate');
import Child from '../model/child';

export function getChilds(userId) {
  const params: any = {
    userId: {eq: userId}
  };
  return Child.scan(params).exec();
}

export function getChild(args, userId) {
  return Child.get(args.id)
    .then((child: any) => {
      if (!child) {
        throw new Error('Child not found');
      }
      if (child.userId !== userId) {
        throw new Error('Permission denied');
      }
      return child;
    });
}

export function createChild(args, userId) {
  const child = new Child({
    id: generate('0123456789', 20),
    userId: userId,
    ...args
  });
  return child.save();
}

export function updateChild(args, userId) {
  return Child.get(args.id)
    .then((child: any) => {
      if (!child) {
        throw new Error('Child not found');
      }
      if (args.label) {
        child.label = args.label;
      }
      if (args.description) {
        child.description = args.description;
      }
      return child.save();
    });
}

export function deleteChild(args, userId) {
  return Child.get(args.id)
    .then((child: any) => {
      if (!child) {
        throw new Error('Child not found');
      }
      return child.delete();
    });
}
