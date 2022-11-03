import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import CharactersInfo from '../../data/universe-characters.json';
import { Numbers } from '../../types';

describe('CardList', (): void => {
  it('Should render cards list', async (): Promise<void> => {
    render(<App />, { wrapper: BrowserRouter });
    expect(await screen.findByTestId('main-characters-list')).toBeInTheDocument();
  });

  it('Should contain the appropriate amount of cards', async (): Promise<void> => {
    render(<App />, { wrapper: BrowserRouter });
    expect((await screen.findAllByTestId('main-page-character-card')).length).toEqual(
      CharactersInfo.length
    );
  });
});

describe('Custom CardList', (): void => {
  it('Should render cards list', async (): Promise<void> => {
    render(<App />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    await user.click(screen.getByText('Form'));
    expect(screen.getByTestId('main-characters-list')).toBeInTheDocument();
  });

  it('Should contain the appropriate amount of cards', async (): Promise<void> => {
    global.URL.createObjectURL = jest.fn();

    render(<App />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    await user.click(screen.getByText('Form'));

    const nameInput = screen.getByRole('textbox');
    const speciesSelect = screen.getByRole('combobox');
    const optionToSelect = screen.getByRole('option', { name: 'Human' }) as HTMLOptionElement;
    const birthdayInput = screen.getByLabelText(/birth date:/i);
    const fileInput = screen.getByLabelText(/photo:/i) as HTMLInputElement;
    const agreeInput = screen.getByTestId('agree-input');
    const submitButton = screen.getByText(/create character/i);

    await user.type(nameInput, 'abc');
    expect(submitButton).toBeEnabled();
    await user.selectOptions(speciesSelect, optionToSelect);
    await user.type(birthdayInput, '1999-08-15');
    const imageFile = new File(['file'], 'file.png', { type: 'image/png' });
    Object.defineProperty(fileInput, 'value', { value: imageFile.name });
    fireEvent.change(fileInput);
    await user.click(agreeInput);
    await user.click(submitButton);

    expect(await screen.findAllByTestId('main-page-character-card')).toHaveLength(Numbers.One);
  });
});

describe('Modal', (): void => {
  it('Should open, show children and a close button', async (): Promise<void> => {
    render(
      <>
        <div id="modal-root"></div>
        <App />
      </>,
      { wrapper: BrowserRouter }
    );
    const user = userEvent.setup();
    await user.click(screen.getByText('Main'));
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

  it('Should close after click on a close button', async (): Promise<void> => {
    render(
      <>
        <div id="modal-root"></div>
        <App />
      </>,
      { wrapper: BrowserRouter }
    );
    const user = userEvent.setup();
    await user.click(screen.getByText('Main'));
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
        <App />
      </>,
      { wrapper: BrowserRouter }
    );
    const user = userEvent.setup();
    await user.click(screen.getByText('Main'));
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
