import React, { useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../customHooks';
import { callApi, errorApi, successApi } from '../../state/AppReducer';
import './MainPage.css';
import SearchBar from '../../components/SearchBar';
import CardsSorting from '../../components/CardsSorting';
import Pagination from '../../components/Pagination';
import CardList from '../../components/CardList';
import Loader from '../../components/Loader';
import CharactersAPI from '../../api/charactersApi';
import { API_ERROR_MESSAGES } from '../../constants';
import { Numbers } from '../../types';

const MainPage = (): JSX.Element => {
  const state = useAppSelector((state) => state.mainState);
  const dispatch = useAppDispatch();

  const updateMainPageState = useCallback(
    async (newSearchParameter?: Record<string, unknown>): Promise<void> => {
      dispatch(callApi());
      try {
        const savedSearchParameters = {
          name: state.name,
          pageInApi: Numbers.One,
          status: state.status,
          gender: state.gender,
          alphabeticalOrder: state.alphabeticalOrder,
          amountPerPage: state.cardsPerPage,
          currentPage: state.currentPage,
        };
        const charactersData = await new CharactersAPI().getCharacters({
          ...savedSearchParameters,
          ...newSearchParameter,
        });
        dispatch(
          successApi({
            data: charactersData.cards,
            totalPages: charactersData.pagesAmount,
          })
        );
      } catch (error) {
        dispatch(errorApi(error instanceof Error ? error.message : API_ERROR_MESSAGES.unknown));
      }
    },
    [
      dispatch,
      state.alphabeticalOrder,
      state.cardsPerPage,
      state.currentPage,
      state.gender,
      state.name,
      state.status,
    ]
  );

  useEffect((): void => {
    if (!state.characters.length && !state.errorMessage) {
      updateMainPageState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.characters.length, updateMainPageState]);

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
