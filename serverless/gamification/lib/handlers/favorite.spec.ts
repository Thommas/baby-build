/**
 * Path of child
 *
 * Gamification - Handlers - Favorite
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { handleFavorite } from './favorite'
import * as dynamoGamification from '../dynamo/gamification';

describe('Handlers', function() {
  it('handleFavorite', function() {
    spyOn(dynamoGamification, 'addXp').and.returnValue(new Promise((resolve) =>
      resolve()
    ))
    const event = {
      Records: [
        {
          eventName: 'INSERT',
          dynamodb: {
            NewImage: {
              user_id: {
                S: 'test-user-id'
              }
            }
          }
        }
      ]
    }
    const context = {}
    const callback = () => {}
    handleFavorite(event, context, callback)
  });
});
