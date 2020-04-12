/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { elasticSearchService } from '../services';
import { handleEvent } from './event.handler';

describe('Handlers', function() {
  it('handleEvent', function() {
    spyOn(elasticSearchService, 'index').and.returnValue(new Promise((resolve) =>
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
    handleEvent(event, context, callback)
  });
});
