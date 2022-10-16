import React from 'react';
import { ICardListProps, ICustomDataElement, IDataElement } from 'types';
import './CardList.css';
import CardItem from '../CardItem';

const CardList = (props: ICardListProps): JSX.Element => {
  const characters = props.characters;
  return (
    <ul className="main__cards-list" data-testid="main-characters-list">
      {characters.map(
        (character: IDataElement | ICustomDataElement): JSX.Element => (
          <CardItem
            key={character.id.toString()}
            character={(character as IDataElement) || (character as ICustomDataElement)}
          />
        )
      )}
    </ul>
  );
};

export default CardList;
