/**
 * Path of child
 *
 * GraphQL - Dynamo - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

require('dotenv').config();
import { updateTask } from '../lib/dynamo/task'

describe('Task', () => {
  it('updateTask', (done) => {
    updateTask({ id: '1' }, 'user-id').then((data: any) => {
      done();
    })
  });
});
