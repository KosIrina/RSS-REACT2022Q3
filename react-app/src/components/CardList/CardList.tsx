import React, { useState } from 'react';
import { ICardListProps, ICustomDataElement, IDataElement } from 'types';
import './CardList.css';
import CardItem from '../CardItem';
import Modal from '../UI/Modal';
import Button from '../UI/Button';

const CardList = (props: ICardListProps): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chosenCharacterInfo, setChosenCharacterInfo] = useState<
    IDataElement | ICustomDataElement | null
  >(null);

  const handleModal = (chosenCharacterInfo?: IDataElement | ICustomDataElement): void => {
    setIsModalVisible(!isModalVisible);
    setChosenCharacterInfo(chosenCharacterInfo ? chosenCharacterInfo : null);
  };

  return (
    <>
      <ul className="main__cards-list" data-testid="main-characters-list">
        {props.characters.map(
          (character: IDataElement | ICustomDataElement): JSX.Element => (
            <CardItem
              key={character.id}
              character={(character as IDataElement) || (character as ICustomDataElement)}
              onClick={(): void => {
                handleModal(character);
              }}
              showFullInfo={false}
            />
          )
        )}
      </ul>
      {isModalVisible && chosenCharacterInfo && (
        <Modal>
          <div
            className="modal-overlay"
            data-testid="modal-overlay"
            onClick={(): void => handleModal()}
          />
          <div className="modal-window" data-testid="modal-window">
            <Button
              classes={{
                container: 'modal-window__close-button-container',
                button: 'modal-window__close-button',
              }}
              type="button"
              buttonText="×"
              onClick={(): void => handleModal()}
            />
            <ul className="modal-window__character-card">
              <CardItem
                key={chosenCharacterInfo.id}
                character={
                  (chosenCharacterInfo as IDataElement) ||
                  (chosenCharacterInfo as ICustomDataElement)
                }
                showFullInfo={true}
              />
            </ul>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CardList;
