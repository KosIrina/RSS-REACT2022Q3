import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from '.';
import userEvent from '@testing-library/user-event';
import { LOCAL_STORAGE_KEYS } from '../../constants';

describe('SearchBar', (): void => {
  it('Should render search bar', (): void => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText(/search character../i)).toBeInTheDocument();
  });

  it('Should have no value on first load', (): void => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText(/search character../i)).not.toHaveValue();
  });

  it('Should have value on its change', async (): Promise<void> => {
    render(<SearchBar />);
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText(/search character../i), 'test value');
    expect(screen.getByPlaceholderText(/search character../i)).toHaveValue('test value');
  });

  it('Should add value to local storage on unmount', async (): Promise<void> => {
    render(<SearchBar />);
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText(/search character../i), 'test value');
    const { unmount } = render(<SearchBar />);
    unmount();
    expect(localStorage.getItem(LOCAL_STORAGE_KEYS.searchValue)).toEqual('test value');
  });
});
