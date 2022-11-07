import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../customHooks';
import './Navigation.css';

const Navigation = (): JSX.Element => {
  const { mainState, formState } = useAppSelector((state) => state);

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
          to={`/characters/${mainState.selectedCharacter?.id || formState.selectedCharacter?.id}`}
        >
          Character
        </NavLink>
      </nav>
    </>
  );
};

export default Navigation;
