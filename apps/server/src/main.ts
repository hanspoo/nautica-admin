import { ApolloServer } from '@apollo/server';
import fs from 'fs';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { gql } from '@apollo/client';
import { resolvers } from '@nx-oidc-starter/lib-graphql';
import { authMdw } from './authMdw';

interface MyContext {
  token?: string;
}

const app = express();
const httpServer = http.createServer(app);

async function partida() {
  const s = fs.readFileSync(__dirname + '/assets/schema.graphql');

  const typeDefs = gql(`${s}`);

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.get('/api/hello', (req, res) => {
    res.send('Hello API, public access');
  });
  app.get('/api/protected', authMdw, (req, res) => {
    res.send('This is protected');
  });
  app.use(
    '/graphql',
    authMdw,
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  const port = process.env.PORT || 3333;
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`server started at port http://localhost:${port} `);
}

partida();
