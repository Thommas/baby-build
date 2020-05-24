/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const { gql } = require('apollo-server-lambda');

const World = gql`
  type World {
    id: String
    label: String
  }
  type WorldEdge {
    total: Int!
    cursor: String!
    nodes: [World]
  }
  input WorldInput {
    label: String
    count: Int
  }
  type Query {
    worlds(worldInput: WorldInput, cursor: String, sort: String): WorldEdge
  }
  type Mutation {
    createWorld(
      label: String!
    ): World
    updateWorld(
      id: String!
      label: String
    ): World
    deleteWorld(
      id: String!
    ): World
  }
`;
export default World;
