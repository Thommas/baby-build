/**
 * Path of child
 *
 * GraphQL - Model - Config
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

declare var process: {
  env: {
    LOCAL_DYNAMODB_HOST: string,
    LOCAL_DYNAMODB_PORT: string,
  }
}

const config = (dynamoose) => {
  const {
    LOCAL_DYNAMODB_HOST,
    LOCAL_DYNAMODB_PORT,
  } = process.env;

  if (LOCAL_DYNAMODB_HOST && LOCAL_DYNAMODB_PORT) {
    dynamoose.AWS.config.update({
      region: 'eu-west-2',
    });
    dynamoose.local(`http://${LOCAL_DYNAMODB_HOST}:${LOCAL_DYNAMODB_PORT}`);
  }
}

export default config;
