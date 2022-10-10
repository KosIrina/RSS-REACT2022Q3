import React from 'react';
import Form from '../../components/Form';
import CardList from '../../components/CardList';
import { ICustomDataElement, IFormPageState, EmptyObject } from '../../types';

class FormPage extends React.Component<EmptyObject, IFormPageState> {
  constructor(props: EmptyObject) {
    super(props);
    this.state = {
      cards: [],
    };
    this.addNewCard = this.addNewCard.bind(this);
  }

  addNewCard(card: ICustomDataElement): void {
    this.setState((state) => ({
      cards: [card, ...state.cards],
    }));
  }

  render(): JSX.Element {
    return (
      <div className="main-wrapper">
        <h2 className="main__title">Here you can create your own character</h2>
        {<Form addNewCard={this.addNewCard} />}
        {<CardList characters={this.state.cards} />}
      </div>
    );
  }
}

export default FormPage;
