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
  updateIdea,
} from '../lib/dynamo/idea'

describe('Idea', () => {
  it('getIdeas', (done) => {
    getIdeas('auth0|5a773beebfd2511753f2c9c0', {}).then((data: any) => {
      done();
    })
  });

  it('createIdea', (done) => {
    const args = {
      label: 'test-label',
    };
    createIdea(args, 'auth0|5a773beebfd2511753f2c9c0').then((data: any) => {
      done();
    })
  });

  it('updateIdea', (done) => {
    const args = {
      id: '0986945c-36de-4f34-b869-d06039501879',
      label: 'Test',
    };
    updateIdea(args, 'auth0|5a773beebfd2511753f2c9c0').then((data: any) => {
      done();
    })
  });
});
