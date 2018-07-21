/**
 * Path of build
 *
 * GraphQL - Types - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const Build = `
  type Build {
    id: String!
    name: String!
    description: String
    xp: Int!
    lvl: Int!
    user: User!
  }
  type Query {
    builds: [Build]
    build(id: ID!): Build
  }
  type Mutation {
    createBuild(
      name: String!
      description: String
    ): Build
    updateBuild(
      id: ID!
      name: String!
      description: String
    ): Build
    deleteBuild(
      id: ID!
    ): Build
  }
`;
export default Build;
