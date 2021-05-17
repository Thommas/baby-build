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
    name: 'pathofchild-puppeteer',
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
      packagerOptions: {
        scripts: [
          'rm -rf ./node_modules/puppeteer/.local-chromium/*',
        ]
      }
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
    streamElasticsearch: {
      handler: 'handler.streamElasticsearch',
      events: [{
        stream: {
          enabled: true,
          type: 'dynamodb',
          arn: 'arn:aws:dynamodb:ddblocal:000000000000:table/pathofchild-dev/stream/2021-04-30T19:55:02.778',
        }
      }]
    },
    streamIdea: {
      handler: 'handler.streamIdea',
      events: [{
        stream: {
          enabled: true,
          type: 'dynamodb',
          arn: 'arn:aws:dynamodb:ddblocal:000000000000:table/pathofchild-dev/stream/2021-04-30T19:55:02.778',
        }
      }]
    },
    sqs: {
      handler: 'handler.sqs',
      events: [{
        sqs: {
          arn: 'arn:aws:sqs:ddblocal:000000000000:pathofchild-dev',
        }
      }]
    }
  }
}

module.exports = serverlessConfiguration;
