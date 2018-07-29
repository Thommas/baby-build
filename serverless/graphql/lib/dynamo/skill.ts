/**
 * Path of child
 *
 * GraphQL - Dynamo - Skill
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import generate = require('nanoid/generate');
import Skill from '../model/skill';

export function getSkills(args, userId) {
  const params: any = {
    buildId: {eq: args.buildId},
    userId: {eq: userId}
  };
  return Skill.scan(params).exec();
}

export function createSkill(args, userId) {
  const skill = new Skill({
    id: generate('0123456789', 20),
    userId: userId,
    ...args
  });
  return skill.save();
}

export function updateSkill(args, userId) {
  return Skill.get(args.id)
    .then((skill: any) => {
      if (!skill) {
        throw new Error('Skill not found');
      }
      if (args.label) {
        skill.label = args.label;
      }
      if (args.description) {
        skill.description = args.description;
      }
      return skill.save();
    });
}

export function deleteSkill(args, userId) {
  return Skill.get(args.id)
    .then((skill: any) => {
      if (!skill) {
        throw new Error('Skill not found');
      }
      return skill.delete();
    });
}
