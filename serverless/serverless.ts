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
    name: 'pathofchild',
  },
  frameworkVersion: '2',
  package: {
    individually: true
  },
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
      keepoutputDirectory: true
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
    // 'serverless-offline': {
    //   port: 3010
    // },
    // 'serverless-offline-dynamodb-streams': {
    //   apiVersion: '2013-12-02',
    //   endpoint: 'http://0.0.0.0:4566',
    //   region: 'local',
    //   accessKeyId: 'test',
    //   secretAccessKey: 'test',
    //   skipCacheInvalidation: false,
    //   readInterval: 500
    // },
    // 'serverless-offline-sqs-external': {
    //   autoCreate: false,
    //   apiVersion: '2013-12-02',
    //   endpoint: 'http://0.0.0.0:4566',
    //   region: 'local',
    //   accessKeyId: 'test',
    //   secretAccessKey: 'test',
    //   skipCacheInvalidation: false
    // }
  },
  plugins: [
    'serverless-webpack',
    // 'serverless-offline-dynamodb-streams',
    // 'serverless-offline-sqs-external',
    // 'serverless-offline',
    'serverless-localstack',
  ],
  provider: {
    name: 'aws',
    region: process.env.AWS_REGION,
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    // iamRoleStatements: [
    //   {
    //     Effect: 'Allow',
    //     Action: [
    //       'dynamodb:*'
    //     ],
    //     Resource: 'arn:aws:dynamodb:${self:provider.region}:*:*'
    //   }
    // ]
  },
  functions: {
    // customAuthorizer: {
    //   handler: 'lib/handler.auth'
    // },
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
    streamElasticsearch: {
      handler: 'lib/handler.streamElasticsearch',
      events: [{
        stream: {
          enabled: true,
          type: 'dynamodb',
          arn: 'arn:aws:dynamodb:ddblocal:000000000000:table/pathofchild-dev/stream/2021-04-30T19:55:02.778',
        }
      }]
    },
    streamIdea: {
      handler: 'lib/handler.streamIdea',
      events: [{
        stream: {
          enabled: true,
          type: 'dynamodb',
          arn: 'arn:aws:dynamodb:ddblocal:000000000000:table/pathofchild-dev/stream/2021-04-30T19:55:02.778',
        }
      }]
    },
    sqs: {
      handler: 'lib/handler.sqs',
      events: [{
        sqs: {
          arn: 'arn:aws:sqs:ddblocal:000000000000:pathofchild-dev',
        }
      }]
    }
  }
}

module.exports = serverlessConfiguration;
