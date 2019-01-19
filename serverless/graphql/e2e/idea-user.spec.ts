/**
 * Path of child
 *
 * GraphQL - Dynamo - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

require('dotenv').config();
import {
  getIdeaUsers,
  getLoggedIdeaUser,
  updateIdeaUser
} from '../lib/dynamo/idea-user'

describe('IdeaUser', () => {
  it('getIdeaUsers', (done) => {
    getIdeaUsers('0986945c-36de-4f34-b869-d06039501879').then((data: any) => {
      done();
    })
  });

  it('getLoggedIdeaUser', (done) => {
    getLoggedIdeaUser('0986945c-36de-4f34-b869-d06039501879', 'auth0|5a773beebfd2511753f2c9c0').then((data: any) => {
      done();
    })
  });

  it('updateIdeaUser', (done) => {
    updateIdeaUser({
      id: '4ae840c5-d097-4e4f-a3d4-19b38b6d9c40',
      ideaId: '0986945c-36de-4f34-b869-d06039501879',
      score: 2
    }, 'auth0|5a773beebfd2511753f2c9c0').then((data: any) => {
      done();
    })
  });
});
