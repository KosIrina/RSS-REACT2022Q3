import React from 'react';
import { ICardListProps, ICardListState, ICustomDataElement, IDataElement } from 'types';
import './CardList.css';
import CardItem from '../CardItem';
import Modal from '../UI/Modal';
import Button from '../UI/Button';

class CardList extends React.Component<ICardListProps, ICardListState> {
  constructor(props: ICardListProps) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
    this.handleModal = this.handleModal.bind(this);
  }

  handleModal(chosenCharacterInfo?: IDataElement | ICustomDataElement): void {
    this.setState(
      (state: ICardListState): ICardListState => ({
        isModalVisible: !state.isModalVisible,
        chosenCharacterInfo: chosenCharacterInfo ? chosenCharacterInfo : undefined,
      })
    );
  }

  render(): JSX.Element {
    return (
      <>
        <ul className="main__cards-list" data-testid="main-characters-list">
          {this.props.characters.map(
            (character: IDataElement | ICustomDataElement): JSX.Element => (
              <CardItem
                key={character.id}
                character={(character as IDataElement) || (character as ICustomDataElement)}
                onClick={(): void => {
                  this.handleModal(character);
                }}
              />
            )
          )}
        </ul>
        {this.state.isModalVisible && this.state.chosenCharacterInfo && (
          <Modal>
            <div className="modal-overlay" onClick={(): void => this.handleModal()} />
            <div className="modal-window">
              <Button
                classes={{
                  container: 'modal-window__close-button-container',
                  button: 'modal-window__close-button',
                }}
                type="button"
                buttonText="×"
                onClick={(): void => this.handleModal()}
              />
              <ul className="modal-window__character-card">
                <CardItem
                  key={this.state.chosenCharacterInfo.id}
                  character={
                    (this.state.chosenCharacterInfo as IDataElement) ||
                    (this.state.chosenCharacterInfo as ICustomDataElement)
                  }
                />
              </ul>
            </div>
          </Modal>
        )}
      </>
    );
  }
}

export default CardList;
