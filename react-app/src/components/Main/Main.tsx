import React from 'react';
import { Outlet } from 'react-router-dom';
import './Main.css';

const Main = (): JSX.Element => {
  return (
    <>
      <main className="main container">
        <Outlet />
      </main>
    </>
  );
};

export default Main;
