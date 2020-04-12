/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import express = require('express');
import graphqlHTTP = require( 'express-graphql');
import cors = require('cors');
import schema from '../schema/schema';

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
  formatError: (error: any) => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack,
    path: error.path
  })
}));

app.listen(4000, () => {
  console.log('http://localhost:4000/graphql');
});
