/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const { gql } = require('apollo-server-lambda');

const Idea = gql`
  type Imgs {
    icon: [String]
    cover: [String]
    screenshot: [String]
    png: [String]
  }
  type Idea {
    id: String
    label: String
    category: String
    platform: String
    language: String
    releaseDate: String
    timeToCompletion: Int
    requiredAge: Float
    score: Float
    userId: String
    user: User
    imgs: Imgs
    audios: [File]
  }
  input IdeaInput {
    label: String
    category: String
    requiredAge: Float
    score: Float
    language: String
    count: Int
  }
  type IdeaEdge {
    total: Int!
    cursor: String!
    nodes: [Idea]
  }
  type Query {
    ideas(ideaInput: IdeaInput, cursor: String, sort: String): IdeaEdge
  }
  type Mutation {
    createIdea(
      label: String!
      category: String!
      platform: String
    ): Idea
    updateIdea(
      id: String!
      label: String
      category: String
      platform: String
      language: String
      releaseDate: String
      timeToCompletion: Int
      requiredAge: Float
      score: Float
    ): Idea
    deleteIdea(
      id: String!
    ): Idea
    addAudio(
      id: String!
      name: String!
      size: Int!
      type: String!
      data: String!
    ): Idea
    removeAudio(
      id: String!
      fileId: String!
    ): Idea
  }
`;
export default Idea;
