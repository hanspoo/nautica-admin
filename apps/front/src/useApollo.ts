import {
  InMemoryCache,
  ApolloClient,
  HttpLink,
  ApolloLink,
} from '@apollo/client';

import { useAuth } from 'react-oidc-context';

export function useApollo() {
  const auth = useAuth();

  // Middleware to add the Authorization header
  const authLink = new ApolloLink((operation, forward) => {
    const token = auth.user?.access_token;

    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    }));

    return forward(operation);
  });

  // HTTP link to your GraphQL server
  const httpLink = new HttpLink({
    uri: `${import.meta.env.VITE_SERVER_URL}/graphql`,
  });

  // Combine the links
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return client;
}
