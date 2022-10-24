import React, { useState } from 'react';
import Form from '../../components/Form';
import CardList from '../../components/CardList';
import { ICustomDataElement, CustomData } from '../../types';

const FormPage = (): JSX.Element => {
  const [cards, setCards] = useState<CustomData>([]);

  const addNewCard = (card: ICustomDataElement): void => {
    setCards([card, ...cards]);
  };

  return (
    <div className="main-wrapper">
      <h2 className="main__title">Here you can create your own character</h2>
      {<Form addNewCard={addNewCard} />}
      {<CardList characters={cards} />}
    </div>
  );
};

export default FormPage;
