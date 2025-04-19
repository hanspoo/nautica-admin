import { ApolloServer } from '@apollo/server';
import fs from 'fs';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
//import { auth } from 'express-openid-connect';

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

  // app.use('/', (req, res, next) => {
  //   const authorization = req.headers['authorization'];
  //   if (authorization) {
  //     const [, token] = authorization.trim().split(/ /);
  //     req.headers['token'] = token;
  //   }

  //   next();
  // });

  // const config = {
  //   authRequired: false,
  //   auth0Logout: true,
  //   baseURL: process.env.VITE_BASE_URL || 'missing-base-url',
  //   clientID: process.env.VITE_CLIENT_ID || 'missing-client-id',
  //   issuerBaseURL: process.env.VITE_AUTHORITY || 'missing-authority',
  //   secret: 'LONG_RANDOM_STRING',
  // };

  // // auth router attaches /login, /logout, and /callback routes to the baseURL
  // app.use(auth(config));

  // req.isAuthenticated is provided from the auth router
  // app.get('/', (req: any, res) => {
  //   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  // });

  //  app.use(authMdw);

  // const authenticated = (req, res, next) => {
  //   if (req.oidc.isAuthenticated()) return next();

  //   console.log('inválid access');
  //   return res.status(400).send();
  // };

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
