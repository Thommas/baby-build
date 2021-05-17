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
  package: {
    individually: false
  },
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
      keepOutputDirectory: true,
    },
    localstack: {
      stages: ['local'],
      host: 'http://localhost',
      edgePort: 4566,
      autostart: true,
      debug: true,
      lambda: {
        mountCode: true
      },
      docker: {
        sudo: false
      }
    },
  },
  plugins: [
    'serverless-webpack',
    'serverless-localstack',
  ],
  provider: {
    name: 'aws',
    region: process.env.AWS_REGION,
    stage: 'local',
    lambdaHashingVersion: 20201221,
    runtime: 'nodejs12.x',
    timeout: 30,
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
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
