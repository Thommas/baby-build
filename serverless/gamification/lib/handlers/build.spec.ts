/**
 * Path of child
 *
 * Gamification - Handlers - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { handleBuild } from './build'
import * as dynamoGamification from '../dynamo/gamification';

describe('Handlers', function() {
  it('handleBuild', function() {
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
    handleBuild(event, context, callback)
  });
});
