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
