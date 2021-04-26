/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

require('dotenv').config();
import { fixturesService, graphQLService } from '../../lib/services';
import { GetIdeas } from '../../lib/graphql';

const { createTestClient } = require('apollo-server-testing');

const server = graphQLService.createServer();

const { query } = createTestClient(server);

describe('Idea', () => {
  beforeEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  });
  fit('getIdeas', async () => {
    await fixturesService.load('test.json');
    const ideaInput = {};
    const page = 1;
    const sort = undefined;
    const res = await query({
      query: GetIdeas,
      variables: {
        ideaInput,
        page,
        sort,
      }
    });
    expect(res).toBeDefined();
    expect(res.data).toBeDefined();
    expect(res.data.ideas).toBeDefined();
    expect(res.data.ideas.total).toEqual(2);
    expect(res.data.ideas.page).toEqual(1);
    expect(res.data.ideas.nodes).toHaveSize(2);
  });
});
