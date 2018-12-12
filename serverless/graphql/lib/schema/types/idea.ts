/**
 * Path of child
 *
 * GraphQL - Types - Idea
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const Idea = `
  type Idea {
    id: String!
    label: String
    userId: String!
    loggedIdeaUser: IdeaUser
  }
  type Query {
    ideas: [Idea]
    loggedIdeaUser: IdeaUser
  }
  type Mutation {
    createIdea: Idea
    deleteIdea(
      id: ID!
    ): Idea
  }
`;
export default Idea;
