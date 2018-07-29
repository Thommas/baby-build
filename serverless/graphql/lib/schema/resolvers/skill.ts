/**
 * Path of child
 *
 * GraphQL - Resolvers - Skill
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbSkill from '../../dynamo/skill';

export default {
  Query: {
    skills: (_, args, context) => dbSkill.getSkills(args, context.userId),
  },
  Mutation: {
    createSkill: (_, args, context) => dbSkill.createSkill(args, context.userId),
    updateSkill: (_, args, context) => dbSkill.updateSkill(args, context.userId),
    deleteSkill: (_, args, context) => dbSkill.deleteSkill(args, context.userId),
  }
};
