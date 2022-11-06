import React, { useEffect, useCallback, useContext } from 'react';
import './MainPage.css';
import SearchBar from '../../components/SearchBar';
import CardsSorting from '../../components/CardsSorting';
import Pagination from '../../components/Pagination';
import CardList from '../../components/CardList';
import Loader from '../../components/Loader';
import { AppContext } from '../../state/AppState';
import CharactersAPI from '../../api/charactersApi';
import { API_ERROR_MESSAGES, REDUCER_ACTION_TYPES } from '../../constants';
import { Numbers } from '../../types';

const MainPage = (): JSX.Element => {
  const {
    state: { mainPage },
    dispatch,
  } = useContext(AppContext);

  const updateMainPageState = useCallback(
    async (newSearchParameter?: Record<string, unknown>): Promise<void> => {
      dispatch({ type: REDUCER_ACTION_TYPES.callApi });
      try {
        const savedSearchParameters = {
          name: mainPage.name,
          pageInApi: Numbers.One,
          status: mainPage.status,
          gender: mainPage.gender,
          alphabeticalOrder: mainPage.alphabeticalOrder,
          amountPerPage: mainPage.cardsPerPage,
          currentPage: mainPage.currentPage,
        };
        const charactersData = await new CharactersAPI().getCharacters({
          ...savedSearchParameters,
          ...newSearchParameter,
        });
        dispatch({
          type: REDUCER_ACTION_TYPES.successApi,
          payload: charactersData.cards,
          totalPages: charactersData.pagesAmount,
        });
      } catch (error) {
        dispatch({
          type: REDUCER_ACTION_TYPES.errorApi,
          payload: error instanceof Error ? error.message : API_ERROR_MESSAGES.unknown,
        });
      }
    },
    [
      dispatch,
      mainPage.alphabeticalOrder,
      mainPage.cardsPerPage,
      mainPage.currentPage,
      mainPage.gender,
      mainPage.name,
      mainPage.status,
    ]
  );

  useEffect((): void => {
    if (!mainPage.characters.length && !mainPage.errorMessage) {
      updateMainPageState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainPage.characters.length, updateMainPageState]);

  return (
    <div className="main-wrapper">
      <div className="main-page__search-options">
        <SearchBar updateMainPageState={updateMainPageState} />
        <CardsSorting updateMainPageState={updateMainPageState} />
        <Pagination updateMainPageState={updateMainPageState} />
      </div>
      {mainPage.isLoading && <Loader />}
      {mainPage.errorMessage && (
        <div className="main__error-message" data-testid="cards-error-message">
          {mainPage.errorMessage}
        </div>
      )}
      {!!mainPage.characters.length && !mainPage.isLoading && !mainPage.errorMessage && (
        <CardList />
      )}
    </div>
  );
};

export default MainPage;
