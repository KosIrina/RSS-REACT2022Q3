import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../customHooks';
import './MainPage.css';
import SearchBar from '../../components/SearchBar';
import CardsSorting from '../../components/CardsSorting';
import Pagination from '../../components/Pagination';
import CardList from '../../components/CardList';
import Loader from '../../components/Loader';
import { Numbers } from '../../types';
import { fetchCharacters } from '../../api/charactersApi';

const MainPage = (): JSX.Element => {
  const state = useAppSelector((state) => state.mainState);
  const dispatch = useAppDispatch();

  const updateMainPageState = (newSearchParameter?: Record<string, unknown>): void => {
    const savedSearchParameters = {
      name: state.name,
      pageInApi: Numbers.One,
      status: state.status,
      gender: state.gender,
      alphabeticalOrder: state.alphabeticalOrder,
      amountPerPage: state.cardsPerPage,
      currentPage: state.currentPage,
    };
    dispatch(fetchCharacters({ ...savedSearchParameters, ...newSearchParameter }));
  };

  useEffect((): void => {
    if (!state.characters.length && !state.errorMessage) {
      updateMainPageState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main-wrapper">
      <div className="main-page__search-options">
        <SearchBar updateMainPageState={updateMainPageState} />
        <CardsSorting updateMainPageState={updateMainPageState} />
        <Pagination updateMainPageState={updateMainPageState} />
      </div>
      {state.isLoading && <Loader />}
      {state.errorMessage && (
        <div className="main__error-message" data-testid="cards-error-message">
          {state.errorMessage}
        </div>
      )}
      {!!state.characters.length && !state.isLoading && !state.errorMessage && <CardList />}
    </div>
  );
};

export default MainPage;
