/**
 * Path of child
 *
 * GraphQL - Types - Favorite
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const Favorite = `
  type Favorite {
    id: String!
    title: String
    category: String
    child_year: Int
  }
  type Query {
    favorites(build_id: String!, child_year: Int!): [Favorite]
  }
  type Mutation {
    createFavorite(
      title: String!
      build_id: String!
      category: String!
      child_year: Int!
    ): Favorite
    updateFavorite(
      id: ID!
      title: String
      category: String
    ): Favorite
    deleteFavorite(
      id: ID!
    ): Favorite
  }
`;
export default Favorite;
