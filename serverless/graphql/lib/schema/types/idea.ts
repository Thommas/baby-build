/**
 * Path of child
 *
 * GraphQL - Types - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const Idea = `
  type Idea {
    id: String
    label: String
    category: String
    platform: String
    icon: String
    requiredAge: Float
    score: Float
    userId: String
    user: User
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
      requiredAge: Float
      score: Float
    ): Idea
    deleteIdea(
      id: String!
    ): Idea
  }
`;
export default Idea;
