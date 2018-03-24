/**
 * Path of child
 *
 * Contact - Services - SES
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as aws from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export function sendEmail(data) {
  const subjectText = 'subject';
  const bodyText = 'bodyText';
  const bodyHTML = 'bodyHTML';

  const ses = new AWS.SES();
  const params = {
    Source: process.env.EMAIL,
    Destination: {
      ToAddresses: [
        process.env.EMAIL
      ]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: bodyHTML
        },
        Text: {
          Charset: "UTF-8",
          Data: bodyText
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: subjectText
      }
    },
    Tags: [
      {
        Name: 'source',
        Value: 'AWS'
      },
    ]
  };

  return ses.sendEmail(params).promise();
}
