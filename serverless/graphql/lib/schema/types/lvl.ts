/**
 * Path of child
 *
 * GraphQL - Types - Lvl
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const Lvl = `
  type Lvl {
    id: String!
    label: String
    description: String
    userId: String!
    skillId: String!
  }
  type Query {
    lvls(skillId: String!): [Lvl]
  }
  type Mutation {
    createLvl(
      skillId: String!
    ): Lvl
    updateLvl(
      id: ID!
      label: String
      description: String
    ): Lvl
    deleteLvl(
      id: ID!
    ): Lvl
  }
`;
export default Lvl;
