import React from 'react';
import { ICardItemProps } from 'types';
import './CardItem.css';

const CardItem = (props: ICardItemProps): JSX.Element => {
  return (
    <li className="main-page__card-item character-card" data-testid="main-page-character-card">
      <img className="character-card__image" src={props.character.image} alt="Character image" />
      <p className="character-card__name">
        <i>
          <b>Name: </b>
        </i>
        {props.character.name}
      </p>
      <p className="character-card__status">
        <i>
          <b>Status: </b>
        </i>
        {props.character.status}
      </p>
      <p className="character-card__species">
        <i>
          <b>Species: </b>
        </i>
        {props.character.species}
      </p>
      <p className="character-card__gender">
        <i>
          <b>Gender: </b>
        </i>
        {props.character.gender}
      </p>
      <p className="character-card__episodes">
        <i>
          <b>Amount of episodes: </b>
        </i>
        {props.character.episode.length}
      </p>
    </li>
  );
};

export default CardItem;
