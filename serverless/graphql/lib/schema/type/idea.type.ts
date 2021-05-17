/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const { gql } = require('apollo-server-lambda');

const Idea = gql`
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
    icons: [File]
  }
  input IdeaInput {
    label: String
    category: String
    requiredAge: Float
    hasRequiredAge: Boolean
    score: Float
    hasScore: Boolean
    language: String
    count: Int
  }
  type IdeaEdge {
    total: Int!
    page: Int!
    nodes: [Idea]
  }
  type Query {
    ideas(ideaInput: IdeaInput, page: Int, sort: String): IdeaEdge
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
  }
`;
export default Idea;
