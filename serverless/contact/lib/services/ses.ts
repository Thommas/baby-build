/**
 * Path of child
 *
 * Contact - Services - SES
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as aws from 'aws-sdk';

aws.config.update({
  region: process.env.SES_REGION
});

export function sendEmail(data) {
  const subjectText = `Contact from ${data.name} (${data.email})`;
  const bodyText = data.message;
  const bodyHTML = data.message;

  const ses = new aws.SES();
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
