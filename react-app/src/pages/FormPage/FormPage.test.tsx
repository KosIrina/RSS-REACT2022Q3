import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../utils/testUtils';
import userEvent from '@testing-library/user-event';
import App from '../../components/App';

describe('Form page', (): void => {
  it('Should render card after submit', async (): Promise<void> => {
    global.URL.createObjectURL = jest.fn();

    renderWithProviders(<App />);
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

    expect(await screen.findByTestId('main-page-character-card')).toBeInTheDocument();
  });
});
