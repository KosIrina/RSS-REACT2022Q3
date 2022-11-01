import React, { useEffect, useCallback, useContext } from 'react';
import './MainPage.css';
import SearchBar from '../../components/SearchBar';
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
    async (searchParameter?: string): Promise<void> => {
      dispatch({ type: REDUCER_ACTION_TYPES.callApi });
      try {
        const charactersData = searchParameter
          ? await new CharactersAPI().getCharacters({
              name: searchParameter,
              page: Numbers.One,
            })
          : await new CharactersAPI().getCharacters();
        dispatch({ type: REDUCER_ACTION_TYPES.successApi, payload: charactersData });
      } catch (error) {
        dispatch({
          type: REDUCER_ACTION_TYPES.errorApi,
          payload: error instanceof Error ? error.message : API_ERROR_MESSAGES.unknown,
        });
      }
    },
    [dispatch]
  );

  useEffect((): void => {
    if (!mainPage.characters.length && !mainPage.errorMessage) {
      updateMainPageState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainPage.characters.length, updateMainPageState]);

  return (
    <div className="main-wrapper">
      {<SearchBar updateMainPageState={updateMainPageState} />}
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
