import React, { ChangeEvent, useContext } from 'react';
import Select from '../UI/Select';
import { AppContext } from '../../state/AppState';
import { SEARCH_SELECT_OPTIONS, REDUCER_ACTION_TYPES, EMPTY_STRING } from '../../constants';
import { ICardsSortingProps, Numbers } from '../../types';
import './CardsSorting.css';

const CardsSorting = (props: ICardsSortingProps): JSX.Element => {
  const {
    state: { mainPage },
    dispatch,
  } = useContext(AppContext);

  return (
    <div className="main-page__sorting-container">
      <Select
        classes={{
          select: 'sorting-container__sort-by-status',
          option: 'sorting-container__status-option',
        }}
        selectOptions={SEARCH_SELECT_OPTIONS.byStatus}
        selectedValue={mainPage.status}
        onChange={async (event: ChangeEvent<HTMLSelectElement>): Promise<void> => {
          const newParameter =
            event.target.value === SEARCH_SELECT_OPTIONS.byStatus[Numbers.Zero]
              ? EMPTY_STRING
              : event.target.value;
          dispatch({ type: REDUCER_ACTION_TYPES.sortByStatus, payload: newParameter });
          await props.updateMainPageState({ status: newParameter });
        }}
      />

      <Select
        classes={{
          select: 'sorting-container__sort-by-gender',
          option: 'sorting-container__gender-option',
        }}
        selectOptions={SEARCH_SELECT_OPTIONS.byGender}
        selectedValue={mainPage.gender}
        onChange={async (event: ChangeEvent<HTMLSelectElement>): Promise<void> => {
          const newParameter =
            event.target.value === SEARCH_SELECT_OPTIONS.byGender[Numbers.Zero]
              ? EMPTY_STRING
              : event.target.value;
          dispatch({ type: REDUCER_ACTION_TYPES.sortByGender, payload: newParameter });
          await props.updateMainPageState({ gender: newParameter });
        }}
      />

      <Select
        classes={{
          select: 'sorting-container__sort-alphabetical',
          option: 'sorting-container__alphabetical-order-option',
        }}
        selectOptions={SEARCH_SELECT_OPTIONS.alphabetically}
        selectedValue={mainPage.alphabeticalOrder}
        onChange={async (event: ChangeEvent<HTMLSelectElement>): Promise<void> => {
          const newParameter =
            event.target.value === SEARCH_SELECT_OPTIONS.alphabetically[Numbers.Zero]
              ? EMPTY_STRING
              : event.target.value;
          dispatch({ type: REDUCER_ACTION_TYPES.sortAlphabetically, payload: newParameter });
          await props.updateMainPageState({ alphabeticalOrder: newParameter });
        }}
      />
    </div>
  );
};

export default CardsSorting;
