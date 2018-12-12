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
} from '../lib/dynamo/idea'

describe('Idea', () => {
  it('getIdeas', (done) => {
    getIdeas('auth0|5a773beebfd2511753f2c9c0').then((data: any) => {
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
});
