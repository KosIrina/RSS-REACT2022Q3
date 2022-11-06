import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../state/AppState';
import './Navigation.css';

const Navigation = (): JSX.Element => {
  const {
    state: { mainPage, formPage },
  } = useContext(AppContext);

  return (
    <>
      <nav className="header__navigation navigation">
        <NavLink className="navigation__link" to="/" end>
          Main
        </NavLink>
        <NavLink className="navigation__link" to="/about">
          About Us
        </NavLink>
        <NavLink className="navigation__link" to="/form">
          Form
        </NavLink>
        <NavLink
          className="navigation__link character-link"
          to={`/characters/${mainPage.selectedCharacter?.id || formPage.selectedCharacter?.id}`}
        >
          Character
        </NavLink>
      </nav>
    </>
  );
};

export default Navigation;
