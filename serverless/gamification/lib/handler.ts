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
      // var who = JSON.stringify(record.dynamodb.NewImage.Username.S);
      // var when = JSON.stringify(record.dynamodb.NewImage.Timestamp.S);
    }
  });
  callback(null, `Successfully processed ${event.Records.length} records.`);
};
