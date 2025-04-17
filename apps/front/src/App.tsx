import { BrowserRouter } from 'react-router-dom';
import { MetaApp } from './components/home/meta-app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from './useApollo';

export function App() {
  const client = useApollo();
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <MetaApp />
      </ApolloProvider>
    </BrowserRouter>
  );
}
