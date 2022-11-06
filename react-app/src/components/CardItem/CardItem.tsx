import React from 'react';
import { ICardItemProps, ICustomDataElement, IDataElement } from 'types';
import './CardItem.css';

const CardItem = (props: ICardItemProps): JSX.Element => {
  return (
    <div className="main-page__card-item character-card" data-testid="main-page-character-card">
      <img
        className="character-card__image"
        src={
          (props.character as IDataElement).image || (props.character as ICustomDataElement).avatar
        }
        alt="Character image"
      />
      <p className="character-card__name" data-testid="character-card-name">
        {props.character.name}
      </p>
      {props.showFullInfo && (
        <>
          <p className="character-card__status">
            <span className="character-card__item-name">Status: </span>
            {props.character.status}
          </p>
          <p className="character-card__species">
            <span className="character-card__item-name">Species: </span>
            {props.character.species}
          </p>
          <p className="character-card__gender">
            <span className="character-card__item-name">Gender: </span>
            {props.character.gender}
          </p>
          {((props.character as IDataElement).episode && (
            <p className="character-card__episodes">
              <span className="character-card__item-name">Amount of episodes: </span>
              {(props.character as IDataElement).episode.length}
            </p>
          )) ||
            ((props.character as ICustomDataElement) && (
              <p className="character-card__birthday">
                <span className="character-card__item-name">Birthday: </span>
                {(props.character as ICustomDataElement).birthDate}
              </p>
            ))}
        </>
      )}
    </div>
  );
};

export default CardItem;
