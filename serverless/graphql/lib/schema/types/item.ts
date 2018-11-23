/**
 * Path of child
 *
 * GraphQL - Types - Item
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const Item = `
  type Item {
    id: String!
    label: String
    required_age: Number
    required_age_explanation: String
    score: Number
    score_explanation: String
    userId: String!
    childId: String!
  }
  type Query {
    items(childId: String!): [Item]
  }
  type Mutation {
    createItem(
      childId: String!
    ): Item
    updateItem(
      id: ID!
      label: String
      description: String
    ): Item
    deleteItem(
      id: ID!
    ): Item
  }
`;
export default Item;
