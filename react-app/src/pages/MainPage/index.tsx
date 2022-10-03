import React from 'react';
import './MainPage.css';
import SearchBar from '../../components/SearchBar';
import CardList from '../../components/CardList';
import CharactersInfo from '../../data/universe-characters.json';

const MainPage = (): JSX.Element => {
  return (
    <div className="main-wrapper">
      {<SearchBar />}
      {<CardList characters={CharactersInfo} />}
    </div>
  );
};

export default MainPage;
