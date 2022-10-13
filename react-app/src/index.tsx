import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/kosirina-REACT2022Q3">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
