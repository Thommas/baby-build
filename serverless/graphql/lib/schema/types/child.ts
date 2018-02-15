/**
 * VGADB
 *
 * GraphQL - Child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const Child = `
  type Child {
    id: String!
    title: String
    builds: [Build]
  }
  type ChildContainer {
    edges: [ChildEdge]
  }
  type ChildEdge {
    cursor: String!
    node: Child
  }
  type Query {
    childs: [Child]
    child(id: ID!): Child
  }
  type Mutation {
    createChild(
      title: String!
    ): Child
    updateChild(
      id: ID!
      title: String!
    ): Child
    deleteChild(
      id: ID!
    ): Child
  }
`;
export default Child;
