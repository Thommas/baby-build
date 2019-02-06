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
    userId: String
    loggedIdeaUser: IdeaUser
  }
  type Query {
    ideas(label: String, requiredAge: [Int], score: [Int]): [Idea]
  }
  type Mutation {
    createIdea: Idea
    updateIdea(
      id: String!
      label: String
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
