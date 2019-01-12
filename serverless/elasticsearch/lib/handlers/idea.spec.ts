/**
 * Path of child
 *
 * Elastic search - Handlers - Build
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as elasticsearchService from '../services/elasticsearch';
import { handleIdea } from './idea';

describe('Handlers', function() {
  it('handleBuild', function() {
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
    handleIdea(event, context, callback)
  });
});
