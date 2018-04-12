/**
 * Path of child
 *
 * Count - Handlers - Goal
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { handleGoal } from './favorite'

describe('Handlers', function() {
  it('handleGoal', function() {
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
    handleGoal(event, context, callback)
  });
});
