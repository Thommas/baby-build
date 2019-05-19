/**
 * Path of child
 *
 * Count - Handlers - Favorite
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { handleFavorite } from './favorite'

describe('Handlers', function() {
  it('handleFavorite', function() {
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
