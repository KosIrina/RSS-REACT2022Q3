import React, { ChangeEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../customHooks';
import {
  sortByStatus,
  sortByGender,
  sortAlphabetically,
  changeCardsPerPage,
} from '../../state/AppReducer';
import Select from '../UI/Select';
import { SEARCH_SELECT_OPTIONS, EMPTY_STRING } from '../../constants';
import { ICardsSortingProps, Numbers } from '../../types';
import './CardsSorting.css';

const CardsSorting = (props: ICardsSortingProps): JSX.Element => {
  const state = useAppSelector((state) => state.mainState);
  const dispatch = useAppDispatch();

  return (
    <div className="main-page__sorting-container">
      <Select
        classes={{
          select: 'sorting-container__sort-by-status',
          option: 'sorting-container__status-option',
        }}
        selectOptions={SEARCH_SELECT_OPTIONS.byStatus}
        selectedValue={state.status}
        onChange={async (event: ChangeEvent<HTMLSelectElement>): Promise<void> => {
          const newParameter =
            event.target.value === SEARCH_SELECT_OPTIONS.byStatus[Numbers.Zero]
              ? EMPTY_STRING
              : event.target.value;
          dispatch(sortByStatus(newParameter));
          await props.updateMainPageState({ status: newParameter, currentPage: Numbers.One });
        }}
      />

      <Select
        classes={{
          select: 'sorting-container__sort-by-gender',
          option: 'sorting-container__gender-option',
        }}
        selectOptions={SEARCH_SELECT_OPTIONS.byGender}
        selectedValue={state.gender}
        onChange={async (event: ChangeEvent<HTMLSelectElement>): Promise<void> => {
          const newParameter =
            event.target.value === SEARCH_SELECT_OPTIONS.byGender[Numbers.Zero]
              ? EMPTY_STRING
              : event.target.value;
          dispatch(sortByGender(newParameter));
          await props.updateMainPageState({ gender: newParameter, currentPage: Numbers.One });
        }}
      />

      <Select
        classes={{
          select: 'sorting-container__sort-alphabetical',
          option: 'sorting-container__alphabetical-order-option',
        }}
        selectOptions={SEARCH_SELECT_OPTIONS.alphabetically}
        selectedValue={state.alphabeticalOrder}
        onChange={async (event: ChangeEvent<HTMLSelectElement>): Promise<void> => {
          const newParameter =
            event.target.value === SEARCH_SELECT_OPTIONS.alphabetically[Numbers.Zero]
              ? EMPTY_STRING
              : event.target.value;
          dispatch(sortAlphabetically(newParameter));
          await props.updateMainPageState({
            alphabeticalOrder: newParameter,
            currentPage: Numbers.One,
          });
        }}
      />

      <Select
        classes={{
          select: 'sorting-container__sort-per-page',
          option: 'sorting-container__per-page-option',
        }}
        selectOptions={SEARCH_SELECT_OPTIONS.cardsPerPage}
        selectedValue={state.cardsPerPage}
        onChange={async (event: ChangeEvent<HTMLSelectElement>): Promise<void> => {
          dispatch(changeCardsPerPage(event.target.value));
          await props.updateMainPageState({
            amountPerPage: event.target.value,
            currentPage: Numbers.One,
          });
        }}
      />
    </div>
  );
};

export default CardsSorting;
