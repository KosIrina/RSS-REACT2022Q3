import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../Layout';
import MainPage from '../../pages/MainPage';
import CardPage from '../../pages/CardPage';
import AboutPage from '../../pages/AboutPage';
import FormPage from '../../pages/FormPage';
import PageNotFound from '../../pages/PageNotFound';
import { AppState } from '../../state/AppState';

function App(): JSX.Element {
  return (
    <AppState>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="characters/:id" element={<CardPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="form" element={<FormPage />} />
            <Route path="404" element={<PageNotFound />} />
            <Route path="*" element={<Navigate to="404" />} />
          </Route>
        </Routes>
      </div>
    </AppState>
  );
}

export default App;
