/**
 * Path of child
 *
 * GraphQL - Dynamo - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import generate = require('nanoid/generate');
import Build from '../model/build';

export function getBuilds(userId) {
  const params: any = {
    userId: {eq: userId}
  };
  return Build.scan(params).exec();
}

export function getBuild(args, userId) {
  return Build.get(args.id)
    .then((build: any) => {
      if (!build) {
        throw new Error('Build not found');
      }
      if (build.userId !== userId) {
        throw new Error('Permission denied');
      }
      return build;
    });
}

export function createBuild(args, userId) {
  const build = new Build({
    id: generate('0123456789', 20),
    userId: userId,
    ...args
  });
  return build.save();
}

export function updateBuild(args, userId) {
  return Build.get(args.id)
    .then((build: any) => {
      if (!build) {
        throw new Error('Build not found');
      }
      if (args.label) {
        build.label = args.label;
      }
      if (args.description) {
        build.description = args.description;
      }
      return build.save();
    });
}

export function deleteBuild(args, userId) {
  return Build.get(args.id)
    .then((build: any) => {
      if (!build) {
        throw new Error('Build not found');
      }
      return build.delete();
    });
}
