import React from 'react';
import { render, screen } from '@testing-library/react';
import CharactersInfo from '../../data/universe-characters.json';
import CustomCharactersInfo from '../../data/custom-characters.json';
import { CustomData, Numbers } from '../../types';
import CardItem from '.';

describe('CardItem', (): void => {
  it('Should render card', (): void => {
    render(<CardItem character={CharactersInfo[Numbers.Zero]} onClick={jest.fn()} />);
    expect(screen.getByTestId('main-page-character-card')).toBeInTheDocument();
  });

  it('Should render image', (): void => {
    render(<CardItem character={CharactersInfo[Numbers.Zero]} onClick={jest.fn()} />);
    expect(screen.getByAltText(/character image/i)).toBeInTheDocument();
  });

  it('Should render name', (): void => {
    render(<CardItem character={CharactersInfo[Numbers.Zero]} onClick={jest.fn()} />);
    expect(screen.getByText(/name:/i)).toBeInTheDocument();
  });

  it('Should render status', (): void => {
    render(<CardItem character={CharactersInfo[Numbers.Zero]} onClick={jest.fn()} />);
    expect(screen.getByText(/status:/i)).toBeInTheDocument();
  });

  it('Should render species', (): void => {
    render(<CardItem character={CharactersInfo[Numbers.Zero]} onClick={jest.fn()} />);
    expect(screen.getByText(/species:/i)).toBeInTheDocument();
  });

  it('Should render gender', (): void => {
    render(<CardItem character={CharactersInfo[Numbers.Zero]} onClick={jest.fn()} />);
    expect(screen.getByText(/gender:/i)).toBeInTheDocument();
  });

  it('Should render amount of episodes', (): void => {
    render(<CardItem character={CharactersInfo[Numbers.Zero]} onClick={jest.fn()} />);
    expect(screen.getByText(/amount of episodes:/i)).toBeInTheDocument();
  });

  it('Should not render birthdate', (): void => {
    render(<CardItem character={CharactersInfo[Numbers.Zero]} onClick={jest.fn()} />);
    expect(screen.queryByText(/birthday:/i)).toBeNull();
  });
});

describe('Custom CardItem', (): void => {
  it('Should render card', (): void => {
    render(
      <CardItem
        character={(CustomCharactersInfo as CustomData)[Numbers.Zero]}
        onClick={jest.fn()}
      />
    );
    expect(screen.getByTestId('main-page-character-card')).toBeInTheDocument();
  });

  it('Should render image', (): void => {
    render(
      <CardItem
        character={(CustomCharactersInfo as CustomData)[Numbers.Zero]}
        onClick={jest.fn()}
      />
    );
    expect(screen.getByAltText(/character image/i)).toBeInTheDocument();
  });

  it('Should render name', (): void => {
    render(
      <CardItem
        character={(CustomCharactersInfo as CustomData)[Numbers.Zero]}
        onClick={jest.fn()}
      />
    );
    expect(screen.getByText(/name:/i)).toBeInTheDocument();
  });

  it('Should render status', (): void => {
    render(
      <CardItem
        character={(CustomCharactersInfo as CustomData)[Numbers.Zero]}
        onClick={jest.fn()}
      />
    );
    expect(screen.getByText(/status:/i)).toBeInTheDocument();
  });

  it('Should render species', (): void => {
    render(
      <CardItem
        character={(CustomCharactersInfo as CustomData)[Numbers.Zero]}
        onClick={jest.fn()}
      />
    );
    expect(screen.getByText(/species:/i)).toBeInTheDocument();
  });

  it('Should render gender', (): void => {
    render(
      <CardItem
        character={(CustomCharactersInfo as CustomData)[Numbers.Zero]}
        onClick={jest.fn()}
      />
    );
    expect(screen.getByText(/gender:/i)).toBeInTheDocument();
  });

  it('Should render birthday', (): void => {
    render(
      <CardItem
        character={(CustomCharactersInfo as CustomData)[Numbers.Zero]}
        onClick={jest.fn()}
      />
    );
    expect(screen.getByText(/birthday:/i)).toBeInTheDocument();
  });

  it('Should not render amount of episodes', (): void => {
    render(
      <CardItem
        character={(CustomCharactersInfo as CustomData)[Numbers.Zero]}
        onClick={jest.fn()}
      />
    );
    expect(screen.queryByText(/amount of episodes:/i)).toBeNull();
  });
});
