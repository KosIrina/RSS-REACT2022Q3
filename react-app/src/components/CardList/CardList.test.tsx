import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardList from '.';
import CharactersInfo from '../../data/universe-characters.json';
import CustomCharactersInfo from '../../data/custom-characters.json';
import { CustomData, Numbers } from '../../types';

describe('CardList', (): void => {
  it('Should render cards list', (): void => {
    render(<CardList characters={CharactersInfo} />);
    expect(screen.getByTestId('main-characters-list')).toBeInTheDocument();
  });

  it('Should contain the appropriate amount of cards', (): void => {
    render(<CardList characters={CharactersInfo} />);
    expect(screen.getAllByTestId('main-page-character-card').length).toEqual(CharactersInfo.length);
  });
});

describe('Custom CardList', (): void => {
  it('Should render cards list', (): void => {
    render(<CardList characters={CustomCharactersInfo as CustomData} />);
    expect(screen.getByTestId('main-characters-list')).toBeInTheDocument();
  });

  it('Should contain the appropriate amount of cards', (): void => {
    render(<CardList characters={CustomCharactersInfo as CustomData} />);
    expect(screen.getAllByTestId('main-page-character-card').length).toEqual(
      CustomCharactersInfo.length
    );
  });
});

describe('Modal', (): void => {
  it('Should open, show children and a close button', async (): Promise<void> => {
    render(
      <>
        <div id="modal-root"></div>
        <CardList characters={CharactersInfo} />
      </>
    );
    const user = userEvent.setup();
    const cardsOnPage = await screen.findAllByTestId('main-page-character-card');
    await user.click(cardsOnPage[Numbers.One]);
    expect(screen.getByTestId('modal-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('modal-window')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/amount of episodes/i)).toBeInTheDocument();
    expect(
      screen.getByText(CharactersInfo[Numbers.One].episode.length.toString())
    ).toBeInTheDocument();
  });

  it('Should lose after click on a close button', async (): Promise<void> => {
    render(
      <>
        <div id="modal-root"></div>
        <CardList characters={CharactersInfo} />
      </>
    );
    const user = userEvent.setup();
    const cardsOnPage = await screen.findAllByTestId('main-page-character-card');
    await user.click(cardsOnPage[Numbers.One]);
    await user.click(screen.getByRole('button'));
    expect(screen.queryByTestId('modal-overlay')).toBeNull();
    expect(screen.queryByTestId('modal-window')).toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryByText(/amount of episodes/i)).toBeNull();
    expect(screen.queryByText(CharactersInfo[Numbers.One].episode.length.toString())).toBeNull();
  });

  it('Should close after click on a modal overlay', async (): Promise<void> => {
    render(
      <>
        <div id="modal-root"></div>
        <CardList characters={CharactersInfo} />
      </>
    );
    const user = userEvent.setup();
    const cardsOnPage = await screen.findAllByTestId('main-page-character-card');
    await user.click(cardsOnPage[Numbers.One]);
    await user.click(screen.getByTestId('modal-overlay'));
    expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument();
    expect(screen.queryByTestId('modal-window')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByText(/amount of episodes/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(CharactersInfo[Numbers.One].episode.length.toString())
    ).not.toBeInTheDocument();
  });
});
