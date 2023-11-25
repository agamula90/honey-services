import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    // dev
    //uri: 'http://3.250.40.230:8080/graphql',
    // prod
    uri: 'http://54.170.25.224:8080/graphql',
    //local
    //uri: 'http://localhost:8080/graphql',
    cache: new InMemoryCache(),
  });

const rootElement: null | HTMLElement = document.getElementById('root');

if (rootElement != null) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  );
} else {
  console.log("can't get root element");
}
