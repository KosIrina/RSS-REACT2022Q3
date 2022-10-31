import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { AppState } from './state/AppState';
import './index.css';

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/kosirina-REACT2022Q3">
      <AppState>
        <App />
      </AppState>
    </BrowserRouter>
  </React.StrictMode>
);
