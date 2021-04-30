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
    name: 'pathofchild-serverless',
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    'serverless-offline': {
      port: 3010
    },
    dynamodbStream: {
      host: process.env.LOCAL_DYNAMODB_HOST,
      port: process.env.LOCAL_DYNAMODB_PORT,
      pollForever: true,
      streams: [
        {
          table: process.env.LOCAL_DYNAMODB_TABLE,
          functions: [
            'handle',
          ]
        }
      ]
    },
    localstack: {
      stages: ['dev'],
      host: 'http://localhost',
      edgePort: 4566,
      autostart: true,
      lambda: {
        mountCode: true
      },
      docker: {
        sudo: false
      }
    },
    'serverless-offline-dynamodb-streams': {
      apiVersion: '2013-12-02',
      endpoint: 'http://0.0.0.0:4566',
      region: 'local',
      accessKeyId: 'test',
      secretAccessKey: 'test',
      skipCacheInvalidation: false,
      readInterval: 500
    }
  },
  plugins: [
    'serverless-webpack',
    'serverless-offline-dynamodb-streams',
    'serverless-offline',
    'serverless-localstack',
  ],
  provider: {
    name: 'aws',
    region: 'eu-west-1',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:*'
        ],
        Resource: 'arn:aws:dynamodb:${self:provider.region}:*:*'
      }
    ]
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
    stream: {
      handler: 'lib/handler.stream',
      events: [{
        stream: {
          enabled: true,
          type: 'dynamodb',
          arn: 'arn:aws:dynamodb:ddblocal:000000000000:table/pathofchild-dev/stream/2021-04-30T19:55:02.778',
        }
      }]
    }
  }
}

module.exports = serverlessConfiguration;
