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

export function sendEmail(event, context, callback) {
  const subjectText = 'test';
  const bodyText = 'test';
  const bodyHTML = 'test';

  const ses = new AWS.SES();
  const params = {
    Source: "test@test.com",
    Destination: {
      ToAddresses: [ "test@test.com" ]
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

  ses.sendEmail(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      callback(err);
    } else {
      console.log("Sent email");
      callback(null, `Successfully received contact.`);
    }
  );
}
