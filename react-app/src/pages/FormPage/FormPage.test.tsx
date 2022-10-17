import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormPage from '.';

describe('Form page', (): void => {
  global.URL.createObjectURL = jest.fn();
  it('Should render card after submit', async (): Promise<void> => {
    render(<FormPage />);

    const user = userEvent.setup();
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
    fireEvent.change(fileInput, {
      target: {
        files: [new File(['file'], 'file.png', { type: 'image/png' })],
      },
    });
    await user.click(agreeInput);
    await user.click(submitButton);

    expect(screen.getByText(/abc/i)).toBeInTheDocument();
  });
});
