/**
 * Path of child
 *
 * GraphQL - Types - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const Build = `
  type Build {
    id: String!
    title: String
    description: String
    child: Child
    gamification: Gamification
    quests: [Quest]
  }
  type Query {
    builds(child_id: String!): [Build]
    build(id: ID!): Build
  }
  type Mutation {
    createBuild(
      title: String!
      description: String!
      child_id: String!
    ): Build
    updateBuild(
      id: ID!
      title: String!
      description: String!
    ): Build
    deleteBuild(
      id: ID!
    ): Build
  }
`;
export default Build;
