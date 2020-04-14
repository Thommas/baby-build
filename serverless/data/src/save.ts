/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { dynamoService } from './services/dynamo.service';

declare var process;

dynamoService.save().then(() => {
  console.log('Saving data completed');
  process.exit();
});
