/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as fileRepository from '../../repository/file';

export default {
  Query: {
    files: (_, args) => fileRepository.getFiles(args),
  },
};
