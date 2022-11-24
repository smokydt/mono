import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { loggingPlugin } from './plugin';
import { resolvers } from './resolvers';

const schemaFilename = join(
  dirname(import.meta.url),
  'graphql/schema.graphql'
).replace('file:', '');

const typeDefs = readFileSync(schemaFilename, {
  encoding: 'utf-8',
});

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
    loggingPlugin,
    ApolloServerPluginLandingPageLocalDefault(),
  ],
});

await server.start();

app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server));

const PORT = 4000;

// Now that our HTTP server is fully set up, we can listen to it.
httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});
