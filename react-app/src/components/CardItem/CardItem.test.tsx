import React from 'react';
import { render, screen } from '@testing-library/react';
import CharactersInfo from '../../data/universe-characters.json';
import { Numbers } from '../../constants';
import CardItem from '.';

describe('CardItem', (): void => {
  it('Should render card', (): void => {
    render(<CardItem character={CharactersInfo[Numbers.Zero]} />);
    expect(screen.getByTestId('main-page-character-card')).toBeInTheDocument();
  });

  it('Should render image', (): void => {
    render(<CardItem character={CharactersInfo[Numbers.Zero]} />);
    expect(screen.getByAltText(/character image/i)).toBeInTheDocument();
  });

  it('Should render name', (): void => {
    render(<CardItem character={CharactersInfo[Numbers.Zero]} />);
    expect(screen.getByText(/name:/i)).toBeInTheDocument();
  });

  it('Should render status', (): void => {
    render(<CardItem character={CharactersInfo[Numbers.Zero]} />);
    expect(screen.getByText(/status:/i)).toBeInTheDocument();
  });

  it('Should render species', (): void => {
    render(<CardItem character={CharactersInfo[Numbers.Zero]} />);
    expect(screen.getByText(/species:/i)).toBeInTheDocument();
  });

  it('Should render gender', (): void => {
    render(<CardItem character={CharactersInfo[Numbers.Zero]} />);
    expect(screen.getByText(/gender:/i)).toBeInTheDocument();
  });

  it('Should render amount of episodes', (): void => {
    render(<CardItem character={CharactersInfo[Numbers.Zero]} />);
    expect(screen.getByText(/amount of episodes:/i)).toBeInTheDocument();
  });
});
