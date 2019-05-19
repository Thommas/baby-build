/**
 * Path of child
 *
 * GraphQL - Types - Tag
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const Tag = `
  type Tag {
    id: String
    label: String
    userId: String
    user: User
  }
  type Query {
    tags(label: String): [Tag]
  }
  type Mutation {
    createTag(
      label: String
    ): Tag
    updateTag(
      id: String!
      label: String
    ): Tag
    deleteTag(
      id: String!
    ): Tag
  }
`;
export default Tag;
