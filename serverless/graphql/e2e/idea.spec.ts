/**
 * Path of child
 *
 * GraphQL - Dynamo - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

require('dotenv').config();
import {
  getIdeas,
  createIdea,
  updateIdea
} from '../lib/dynamo/idea'

describe('Idea', () => {
  it('getIdeas', (done) => {
    getIdeas('user-id-test').then((data: any) => {
      done();
    })
  });

  it('createIdea', (done) => {
    const args = {
      label: 'test-label',
    };
    createIdea(args, 'user-id-test').then((data: any) => {
      done();
    })
  });

  it('updateIdea', (done) => {
    updateIdea({ id: 'test-id-test' }, 'user-id-test').then((data: any) => {
      done();
    })
  });
});
