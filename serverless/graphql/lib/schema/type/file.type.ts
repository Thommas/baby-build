/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

const { gql } = require('apollo-server-lambda');

const File = gql`
  type Query {
    files(fileInput: FileInput): [File]
  }
  type File {
    id: String
    name: String
    size: Int
    type: String
    data: String
  }
  input FileInput {
    input: String
  }
`;
export default File;
