/**
 * Path of child
 *
 * GraphQL - Types - Skill
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const Skill = `
  type Skill {
    id: String!
    label: String
    description: String
    userId: String!
    buildId: String!
  }
  type Query {
    skills(buildId: String!): [Skill]
  }
  type Mutation {
    createSkill(
      buildId: String!
    ): Skill
    updateSkill(
      id: ID!
      label: String
      description: String
    ): Skill
    deleteSkill(
      id: ID!
    ): Skill
  }
`;
export default Skill;
