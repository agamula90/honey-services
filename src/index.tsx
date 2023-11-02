import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

const rootElement: null | HTMLElement = document.getElementById('root');

if (rootElement != null) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.log("can't get root element");
}
