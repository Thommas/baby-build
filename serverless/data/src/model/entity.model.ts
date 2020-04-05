/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

export const ENTITIES = [
  'idea',
  'review',
  'sharing',
  'user',
];

export function getEntity(dynamoose, localDynamoDBTable) {
  const Schema = dynamoose.Schema;

  const EntitySchema = new Schema({
    id: {
      type: String,
    },
  }, {
    timestamps: true,
    saveUnknown: true,
  });

  return dynamoose.model(localDynamoDBTable, EntitySchema);
}
