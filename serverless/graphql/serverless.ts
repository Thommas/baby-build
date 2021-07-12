/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import type { Serverless } from 'serverless/aws';

// Load dotenv
require('dotenv').config({
  path: __dirname + '/.env.' + process.env.NODE_ENV
});

const serverlessConfiguration: Serverless = {
  service: {
    name: 'pathofchild-graphql',
  },
  frameworkVersion: '2',
  plugins: [
    'serverless-webpack',
    'serverless-offline',
  ],
  provider: {
    name: 'aws',
    region: process.env.AWS_REGION,
    //stage: 'local',
    runtime: 'nodejs12.x'
  },
  functions: {
    // customAuthorizer: {
    //   handler: 'lib/handler.auth'
    // },
    hello: {
      handler: 'lib/handler.hello',
      events: [
        {
          http: {
            path: 'hello',
            method: 'get',
          }
        }
      ]
    },
    graphql: {
      handler: 'lib/handler.graphql',
      events: [
        {
          http: {
            path: 'graphql',
            method: 'post',
            cors: true,
            // authorizer: 'customAuthorizer',
          }
        }
      ]
    },
  }
}

module.exports = serverlessConfiguration;
