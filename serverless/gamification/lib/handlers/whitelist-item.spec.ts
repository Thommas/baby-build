/**
 * Path of child
 *
 * Gamification - Handlers - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { handleWhitelistItem } from './whitelist-item'
import * as dynamoGamification from '../dynamo/gamification';

describe('Handlers', function() {
  it('handleWhitelistItem', function() {
    spyOn(dynamoGamification, 'updateGamification').and.returnValue(new Promise((resolve) =>
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
    handleWhitelistItem(event, context, callback)
  });
});
