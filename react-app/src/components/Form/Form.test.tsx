import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Numbers } from '../../types';
import Form from '.';

describe('Form render', (): void => {
  it('Should render form', (): void => {
    render(<Form addNewCard={jest.fn()} />);
    expect(screen.getByTestId('submit-form')).toBeInTheDocument();
  });

  it('Should render and update name input', async (): Promise<void> => {
    render(<Form addNewCard={jest.fn()} />);
    const input = screen.getByRole('textbox');
    const user = userEvent.setup();
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
    await user.type(input, 'Bill Gates');
    expect(input).toHaveValue('Bill Gates');
  });

  it('Should render and update status input', async (): Promise<void> => {
    render(<Form addNewCard={jest.fn()} />);
    const input = screen.getByTestId('status-input');
    const user = userEvent.setup();
    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();
    await user.click(input);
    expect(input).toBeChecked();
  });

  it('Should render and update species select', async (): Promise<void> => {
    render(<Form addNewCard={jest.fn()} />);
    const select = screen.getByRole('combobox');
    const optionToSelect = screen.getByRole('option', { name: 'Alien' }) as HTMLOptionElement;
    const user = userEvent.setup();
    expect(select).toBeInTheDocument();
    expect(screen.getAllByRole('option').length).toEqual(Numbers.Four);
    await user.selectOptions(select, optionToSelect);
    expect(optionToSelect.selected).toBeTruthy();
  });

  it('Should render and update gender input', async (): Promise<void> => {
    render(<Form addNewCard={jest.fn()} />);
    const user = userEvent.setup();
    const input = screen.getByTestId('gender-input');
    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();
    await user.click(input);
    expect(input).toBeChecked();
  });

  it('Should render and update date input', async (): Promise<void> => {
    render(<Form addNewCard={jest.fn()} />);
    const user = userEvent.setup();
    const input = screen.getByLabelText(/birth date:/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
    await user.type(input, '2022-02-02');
    expect(input).toHaveValue('2022-02-02');
  });

  it('Should render file input', (): void => {
    render(<Form addNewCard={jest.fn()} />);
    const input = screen.getByLabelText(/photo:/i) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.files).toHaveLength(Numbers.Zero);
  });

  it('Should render and update agree input', async (): Promise<void> => {
    render(<Form addNewCard={jest.fn()} />);
    const user = userEvent.setup();
    const input = screen.getByTestId('agree-input');
    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();
    await user.click(input);
    expect(input).toBeChecked();
  });

  it('Should render button', (): void => {
    render(<Form addNewCard={jest.fn()} />);
    const button = screen.getByText(/create character/i);
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});

describe('Form handle', (): void => {
  global.URL.createObjectURL = jest.fn();

  it('Should show error messages on invalid data', async (): Promise<void> => {
    render(<Form addNewCard={jest.fn()} />);

    const user = userEvent.setup();
    const nameInput = screen.getByRole('textbox');
    const submitButton = screen.getByText(/create character/i);

    await user.type(nameInput, 'a');
    expect(submitButton).toBeEnabled();

    await user.click(submitButton);
    expect(await screen.findByText(/Name should contain at least 2 chars/i)).toBeInTheDocument();
    expect(await screen.findByText(/Species should be selected/i)).toBeInTheDocument();
    expect(await screen.findByText(/Birth date should be selected/i)).toBeInTheDocument();
    expect(await screen.findByText(/Photo should be uploaded/i)).toBeInTheDocument();
    expect(await screen.findByText(/You should agree to create a character/i)).toBeInTheDocument();
    expect(await screen.findByText(/create character/i)).toBeDisabled();
  });

  it('Should submit form on valid data', async (): Promise<void> => {
    render(<Form addNewCard={jest.fn()} />);

    const user = userEvent.setup({ delay: null });
    jest.useFakeTimers();

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

    expect(await screen.findByText(/A new character successfully created!/i)).toBeInTheDocument();
    expect(screen.queryByText(/Name should contain at least 2 chars/i)).toBeNull();
    expect(screen.queryByText(/Species should be selected/i)).toBeNull();
    expect(screen.queryByText(/Birth date should be selected/i)).toBeNull();
    expect(screen.queryByText(/Photo should be uploaded/i)).toBeNull();
    expect(screen.queryByText(/You should agree to create a character/i)).toBeNull();

    act(() => {
      jest.runAllTimers();
    });
    expect(submitButton).toBeDisabled();
    jest.useRealTimers();
  });
});
