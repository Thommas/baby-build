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
    ): Idea
    updateIdea(
      id: String!
      label: String
      requiredAge: Float
      score: Float
    ): Idea
    updateIdeaIcon(
      id: String!
    ): Idea
    deleteIdea(
      id: String!
    ): Idea
  }
`;
export default Idea;
