/**
 * Path of child
 *
 * GraphQL - Types - IdeaTag
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const IdeaTag = `
  type IdeaTag {
    id: String
    tag: Tag
    userId: String
  }
  type Query {
    ideaTags(ideaId: String!): [IdeaTag]
  }
  type Mutation {
    createIdeaTag(
      ideaId: String!
      tagId: String!
    ): IdeaTag
    deleteIdeaTag(
      id: String!
    ): IdeaTag
  }
`;
export default IdeaTag;
