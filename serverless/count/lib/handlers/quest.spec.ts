/**
 * Path of child
 *
 * Count - Handlers - Quest
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { handleQuest } from './favorite'

describe('Handlers', function() {
  it('handleQuest', function() {
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
    handleQuest(event, context, callback)
  });
});
