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
  }
  type Query {
    builds: [Build]
    build(id: ID!): Build
  }
  type Mutation {
    createBuild(
      title: String!
      description: String!
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
