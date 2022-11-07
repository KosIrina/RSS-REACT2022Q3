import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAppSelector } from '../../customHooks';
import { ICustomDataElement, IDataElement } from 'types';
import './CardList.css';
import CardItem from '../CardItem';

const CardList = (): JSX.Element => {
  const state = useAppSelector((state) => state);
  const currentPage = useLocation().pathname.includes('form') ? state.formState : state.mainState;

  return (
    <>
      <div className="main__cards-list" data-testid="main-characters-list">
        {currentPage.characters.map(
          (character: IDataElement | ICustomDataElement): JSX.Element => (
            <Link key={character.id} to={`/characters/${character.id}`}>
              <CardItem
                character={(character as IDataElement) || (character as ICustomDataElement)}
                showFullInfo={false}
              />
            </Link>
          )
        )}
      </div>
    </>
  );
};

export default CardList;
