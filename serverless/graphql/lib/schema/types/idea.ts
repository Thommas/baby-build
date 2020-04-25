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
  }
  type Idea {
    id: String
    label: String
    category: String
    platform: String
    language: String
    requiredAge: Float
    score: Float
    userId: String
    user: User
    imgs: Imgs
  }
  input IdeaInput {
    label: String
    requiredAge: Float
    score: Float
    count: Int
  }
  type IdeaEdge {
    total: Int!
    cursor: String!
    nodes: [Idea]
  }
  type Query {
    ideas(ideaInput: IdeaInput, cursor: String): IdeaEdge
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
      requiredAge: Float
      score: Float
    ): Idea
    deleteIdea(
      id: String!
    ): Idea
  }
`;
export default Idea;
