/**
 * Path of child
 *
 * GraphQL - Dynamo - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

require('dotenv').config();
import { getUserByIdOrCreate } from '../lib/dynamo/user'

describe('User', () => {
  const now = new Date().getTime();
  const userId = 'user-' + now;

  it('getUserByIdOrCreate', (done) => {
    getUserByIdOrCreate(userId).then((data: any) => {
      expect(data.id).toEqual(userId);
      expect(data.created_at).not.toBe(null);
      expect(data.updated_at).not.toBe(null);
      getUserByIdOrCreate(userId).then((data: any) => {
        expect(data.id).toEqual(userId);
        expect(data.created_at).not.toBe(null);
        expect(data.updated_at).not.toBe(null);
        done();
      });
    })
  });
});
