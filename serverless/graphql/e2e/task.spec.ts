/**
 * Path of child
 *
 * GraphQL - Dynamo - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

require('dotenv').config();
import {
	getTasks,
	createTask,
	updateTask
} from '../lib/dynamo/task'

describe('Task', () => {
  it('getTasks', (done) => {
    getTasks('build-id-test', 'user-id-test').then((data: any) => {
      done();
    })
  });

  it('createTask', (done) => {
  	const args = {
  		label: 'test-label',
  		description: 'test-description'
  	};
    createTask(args, 'user-id-test').then((data: any) => {
      done();
    })
  });

  it('updateTask', (done) => {
    updateTask({ id: 'test-id-test' }, 'user-id-test').then((data: any) => {
      done();
    })
  });
});
