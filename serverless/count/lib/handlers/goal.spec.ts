/**
 * Path of child
 *
 * Count - Handlers - Goal
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as db from '../dynamo/count';
import { handleGoal } from './goal'

describe('Handlers', function() {
  it('handleGoal', function() {
    spyOn(db, 'incrementCount').and.returnValue(new Promise((resolve) =>
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
              },
              build_id: {
                S: 'test-build-id'
              },
              child_year: {
                N: 2
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
