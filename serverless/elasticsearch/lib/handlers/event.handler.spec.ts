/**
 * Path of child
 *
 * Elastic search - Handlers - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as elasticsearchService from '../services/elasticsearch';
import { handleEvent } from './event.handler';

describe('Handlers', function() {
  it('handleEvent', function() {
    spyOn(elasticsearchService, 'insert').and.returnValue(new Promise((resolve) =>
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
    handleEvent(event, context, callback, 'idea')
  });
});
