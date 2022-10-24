import React, { useState, useEffect, useCallback } from 'react';
import './MainPage.css';
import SearchBar from '../../components/SearchBar';
import CardList from '../../components/CardList';
import Loader from '../../components/Loader';
import CharactersAPI from '../../api/charactersApi';
import { API_ERROR_MESSAGES } from '../../constants';
import { Data, Numbers } from '../../types';

const MainPage = (): JSX.Element => {
  const [cards, setCards] = useState<Data>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateMainPageState = useCallback(async (searchParameter?: string): Promise<void> => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const charactersData = searchParameter
        ? await new CharactersAPI().getCharacters({
            name: searchParameter,
            page: Numbers.One,
          })
        : await new CharactersAPI().getCharacters();
      setCards(charactersData);
      setIsLoading(false);
      setErrorMessage(null);
    } catch (error) {
      setCards([]);
      setIsLoading(false);
      setErrorMessage(error instanceof Error ? error.message : API_ERROR_MESSAGES.unknown);
    }
  }, []);

  useEffect(() => {
    updateMainPageState();
  }, [updateMainPageState]);

  return (
    <div className="main-wrapper">
      {<SearchBar updateMainPageState={updateMainPageState} />}
      {isLoading && <Loader />}
      {errorMessage && (
        <div className="main__error-message" data-testid="cards-error-message">
          {errorMessage}
        </div>
      )}
      {!!cards.length && !isLoading && !errorMessage && <CardList characters={cards} />}
    </div>
  );
};

export default MainPage;
