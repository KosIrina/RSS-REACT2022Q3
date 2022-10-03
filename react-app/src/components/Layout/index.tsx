import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = (): JSX.Element => {
  return (
    <>
      <header className="header container">
        <h1 className="header__logo">Rick and Morty Characters</h1>
        <nav className="header__navigation navigation">
          <NavLink className="navigation__link" to="/" end>
            Main
          </NavLink>
          <NavLink className="navigation__link" to="/about">
            About Us
          </NavLink>
        </nav>
      </header>

      <main className="main container">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
