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
    characters: [Character]
  }
  type WorldEdge {
    total: Int!
    page: Int!
    nodes: [World]
  }
  input WorldInput {
    label: String
    count: Int
  }
  type Query {
    world(id: String): World
    worlds(worldInput: WorldInput, page: Int, sort: String): WorldEdge
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
    addCharacter(
      id: String!
      characterId: String!
    ): World
    removeCharacter(
      id: String!
      characterId: String!
    ): World
  }
`;
export default World;
