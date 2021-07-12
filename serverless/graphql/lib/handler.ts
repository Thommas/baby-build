/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import {
  APIGatewayProxyEvent
} from "aws-lambda";
import { authService, graphQLService } from './service';

exports.auth = (event, _, callback) => {
  return authService.authenticate(event, callback);
}

export const hello: any = async (event: APIGatewayProxyEvent) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello world',
        input: event,
      }
    ),
  };
};

exports.graphql = (event, context, callback) => {
  const server = graphQLService.createServer();

  const handler = server.createHandler({
    cors: {
      origin: 'http://localhost:4200',
      credentials: true,
    },
  });

  return handler(event, context, callback);
};
