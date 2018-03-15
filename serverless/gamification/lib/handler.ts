/**
 * Path of child
 *
 * Gamification - Handler
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

exports.build = (event, context, callback) => {
  event.Records.forEach((record) => {
    console.log('Stream record: ', JSON.stringify(record, null, 2));
    if (record.eventName == 'INSERT') {
      console.log('userId', record.dynamodb.NewImage.user_id.S)
    }
  });
  callback(null, `Successfully processed ${event.Records.length} records.`);
};

exports.child = (event, context, callback) => {
  event.Records.forEach((record) => {
    console.log('Stream record: ', JSON.stringify(record, null, 2));
    if (record.eventName == 'INSERT') {
      console.log('userId', record.dynamodb.NewImage.user_id.S)
    }
  });
  callback(null, `Successfully processed ${event.Records.length} records.`);
};

exports.whitelistItem = (event, context, callback) => {
  event.Records.forEach((record) => {
    console.log('Stream record: ', JSON.stringify(record, null, 2));
    if (record.eventName == 'INSERT') {
      console.log('userId', record.dynamodb.NewImage.user_id.S)
    }
  });
  callback(null, `Successfully processed ${event.Records.length} records.`);
};
