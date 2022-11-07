import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../customHooks';
import { updateSelectedCard, updateSelectedCustomCard } from '../../state/AppReducer';
import CardItem from '../../components/CardItem';
import { ICustomDataElement, IDataElement } from '../../types';
import './CardPage.css';

const CardPage = (): JSX.Element => {
  const { mainState, formState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const { id } = useParams();

  let card: IDataElement | ICustomDataElement | undefined;
  if (id) {
    card =
      mainState.characters.find(
        (characterCard: IDataElement): boolean => characterCard.id === +id
      ) ||
      formState.characters.find(
        (characterCard: ICustomDataElement): boolean => characterCard.id === id
      );
  }
  const cardNotFound = !card || !id;

  useEffect((): VoidFunction => {
    if (card && (card as IDataElement).episode) {
      dispatch(updateSelectedCard(card as IDataElement));
    } else if (card && (card as ICustomDataElement).birthDate) {
      dispatch(updateSelectedCustomCard(card as ICustomDataElement));
    }

    return (): void => {
      dispatch(updateSelectedCard(null));
      dispatch(updateSelectedCustomCard(null));
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
