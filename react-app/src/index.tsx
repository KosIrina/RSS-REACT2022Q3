import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import setupStore from './state/AppState';
import './index.css';

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/kosirina-REACT2022Q3">
      <Provider store={setupStore()}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
