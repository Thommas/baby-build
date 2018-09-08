/**
 * Path of child
 *
 * GraphQL - Dynamo - User
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

require('dotenv').config();
import {
	getSkills,
	createSkill,
	updateSkill
} from '../lib/dynamo/skill'

describe('Skill', () => {
  it('getSkills', (done) => {
    getSkills('build-id-test', 'user-id-test').then((data: any) => {
      done();
    })
  });

  it('createSkill', (done) => {
  	const args = {
  		label: 'test-label',
  		description: 'test-description'
  	};
    createSkill(args, 'user-id-test').then((data: any) => {
      done();
    })
  });

  it('updateSkill', (done) => {
    updateSkill({ id: 'test-id-test' }, 'user-id-test').then((data: any) => {
      done();
    })
  });
});
