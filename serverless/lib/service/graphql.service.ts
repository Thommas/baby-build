/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import { ApolloServer } from 'apollo-server-lambda';
import { typeDefs, resolvers } from '../schema/schema';
import { configService } from './config.service';

class GraphQLService {
  createServer(): ApolloServer {
    return new ApolloServer({
      playground: true,
      introspection: true,
      typeDefs,
      resolvers,
      context: ({ event, context }) => ({
        headers: event?.headers,
        functionName: context?.functionName,
        event,
        context,
        userId: configService.userId ? configService.userId : event?.requestContext?.authorizer?.userId,
      }),
    });
   }
 }

 export const graphQLService = new GraphQLService();
