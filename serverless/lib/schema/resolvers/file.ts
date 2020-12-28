/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dbFile from '../../dynamo/file';

export default {
  Query: {
    files: (_, args) => dbFile.getFiles(args),
  },
};
