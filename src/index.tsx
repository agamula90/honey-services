import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

export type Environment = 'prod' | 'dev' | 'local';

const environment: Environment = 'dev' as Environment;

let baseUrl: string;

switch (environment) {
  case "prod":
    baseUrl = 'http://54.170.25.224:8080';
    break;
  case 'dev':
    baseUrl = 'http://3.250.40.230:8080';
    break;
  case 'local':
    baseUrl = 'http://localhost:8080';
    break;
}

const client = new ApolloClient({
    uri: `${baseUrl}/graphql`,
    cache: new InMemoryCache(),
  });

if (environment === 'local') {
    loadDevMessages();
    loadErrorMessages();
}

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
