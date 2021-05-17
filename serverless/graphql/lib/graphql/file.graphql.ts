/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import gql from 'graphql-tag';

export const GetFiles = gql`
  query GetFiles($fileInput: FileInput) {
    files(fileInput: $fileInput) {
      id
      name
      type
      size
      data
    }
  }
`;
