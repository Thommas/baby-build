/**
 * Path of child
 *
 * GraphQL - Dynamo - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

require('dotenv').config();
import { getAuthUser } from '../lib/dynamo/user'

describe('User', () => {
  const now = new Date().getTime();
  const userId = 'user-' + now;

  it('getAuthUser', (done) => {
    getAuthUser(userId).then((data1: any) => {
      expect(data1.id).toEqual(userId);
      expect(data1.created_at).not.toBe(null);
      expect(data1.updated_at).not.toBe(null);
      getAuthUser(userId).then((data2: any) => {
        expect(data2.id).toEqual(userId);
        expect(data2.created_at).not.toBe(null);
        expect(data2.updated_at).not.toBe(null);
        done();
      });
    })
  });
});
