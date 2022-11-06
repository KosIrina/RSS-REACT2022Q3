import React, { useContext, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import CardItem from '../../components/CardItem';
import { AppContext } from '../../state/AppState';
import { ICustomDataElement, IDataElement } from '../../types';
import { REDUCER_ACTION_TYPES } from '../../constants';
import './CardPage.css';

const CardPage = (): JSX.Element => {
  const {
    state: { mainPage, formPage },
    dispatch,
  } = useContext(AppContext);

  const { id } = useParams();

  let card: IDataElement | ICustomDataElement | undefined;
  if (id) {
    card =
      mainPage.characters.find(
        (characterCard: IDataElement): boolean => characterCard.id === +id
      ) ||
      formPage.characters.find(
        (characterCard: ICustomDataElement): boolean => characterCard.id === id
      );
  }
  const cardNotFound = !card || !id;

  useEffect((): VoidFunction => {
    if (card && (card as IDataElement).episode) {
      dispatch({
        type: REDUCER_ACTION_TYPES.updateSelectedCard,
        payload: card,
      });
    } else if (card && (card as ICustomDataElement).birthDate) {
      dispatch({
        type: REDUCER_ACTION_TYPES.updateSelectedCustomCard,
        payload: card,
      });
    }

    return (): void => {
      dispatch({
        type: REDUCER_ACTION_TYPES.updateSelectedCard,
        payload: null,
      });
      dispatch({
        type: REDUCER_ACTION_TYPES.updateSelectedCustomCard,
        payload: null,
      });
    };
  }, [card, dispatch]);

  return (
    <>
      {cardNotFound && <Navigate to="/" />}
      {!cardNotFound && (
        <>
          {(card as IDataElement).episode && (
            <Link className="main__all-characters-link" to="/">
              Back
            </Link>
          )}
          {(card as ICustomDataElement).birthDate && (
            <Link className="main__all-characters-link" to="/form">
              Back
            </Link>
          )}
          <CardItem character={card as IDataElement | ICustomDataElement} showFullInfo={true} />
        </>
      )}
    </>
  );
};

export default CardPage;
