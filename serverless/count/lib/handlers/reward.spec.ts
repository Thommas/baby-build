/**
 * Path of child
 *
 * Count - Handlers - Reward
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { handleReward } from './favorite'

describe('Handlers', function() {
  it('handleReward', function() {
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
    handleReward(event, context, callback)
  });
});
