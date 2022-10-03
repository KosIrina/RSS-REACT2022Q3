import React from 'react';
import { render, screen } from '@testing-library/react';
import CardList from '.';
import CharactersInfo from '../../data/universe-characters.json';

describe('CardList', (): void => {
  it('Should render cards list', (): void => {
    render(<CardList characters={CharactersInfo} />);
    expect(screen.getByTestId('main-page-characters-list')).toBeInTheDocument();
  });

  it('Should contain the appropriate amount of cards', (): void => {
    render(<CardList characters={CharactersInfo} />);
    expect(screen.getAllByTestId('main-page-character-card').length).toEqual(CharactersInfo.length);
  });
});
