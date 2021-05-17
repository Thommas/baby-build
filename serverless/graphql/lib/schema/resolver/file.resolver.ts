/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { fileRepository } from '../../repository/file.repository';

export default {
  Query: {
    files: (_, args, context) => fileRepository.getFiles(args, context.userId),
  },
};
