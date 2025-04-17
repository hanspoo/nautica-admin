import { ApolloProvider } from '@apollo/client';
import { useMemo } from 'react';
import { useAuth } from 'react-oidc-context';
import { createApolloClient } from './apolloClient';

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  // Memoize the client so it doesn't recreate on each render
  const client = useMemo(() => {
    return createApolloClient(() => auth.user?.access_token);
  }, [auth.user?.access_token]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
