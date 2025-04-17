// apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// You'll pass the getAccessToken function from React context later
const uri = `/graphql`;

export const createApolloClient = (
  getAccessToken: () => string | undefined
) => {
  const httpLink = new HttpLink({
    uri,
  });

  const authLink = setContext((_, { headers }) => {
    const token = getAccessToken();
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache(),
  });
};
