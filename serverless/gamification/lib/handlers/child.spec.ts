/**
 * Path of child
 *
 * Gamification - Handlers - Child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { handleChild } from './child'
import * as dynamoGamification from '../dynamo/gamification';

describe('Handlers', function() {
  it('handleChild', function() {
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
    handleChild(event, context, callback)
  });
});
