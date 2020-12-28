/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const { gql } = require('apollo-server-lambda');

const Character = gql`
  type Character {
    id: String
    label: String
    userId: String
    user: User
    img: String
    files: [File]
  }
  input CharacterInput {
    label: String
    count: Int
  }
  type CharacterEdge {
    total: Int!
    cursor: String!
    nodes: [Character]
  }
  type Query {
    characters(characterInput: CharacterInput, cursor: String, sort: String): CharacterEdge
  }
  type Mutation {
    createCharacter(
      label: String!
    ): Character
    updateCharacter(
      id: String!
      label: String
    ): Character
    deleteCharacter(
      id: String!
    ): Character
    addFile(
      id: String!
      name: String!
      size: Int!
      type: String!
      data: String!
    ): Character
    removeFile(
      id: String!
      fileId: String!
    ): Character
  }
`;
export default Character;
