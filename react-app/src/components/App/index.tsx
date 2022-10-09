import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../Layout';
import MainPage from '../../pages/MainPage';
import AboutPage from '../../pages/AboutPage';
import FormPage from '../../pages/FormPage';
import PageNotFound from '../../pages/PageNotFound';

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="form" element={<FormPage />} />
          <Route path="404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="404" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
