import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { store } from './store';
import { Provider } from 'react-redux';

const rootElement: null | HTMLElement = document.getElementById('root');

if (rootElement != null) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    );
} else {
    console.log("can't get root element");
}
