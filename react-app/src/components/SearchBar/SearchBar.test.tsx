import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { LOCAL_STORAGE_KEYS } from '../../constants';

describe('SearchBar', (): void => {
  it('Should render search bar', (): void => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByPlaceholderText(/search by name../i)).toBeInTheDocument();
  });

  it('Should have no value on first load', (): void => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByPlaceholderText(/search by name../i)).not.toHaveValue();
  });

  it('Should have value on its change', async (): Promise<void> => {
    render(<App />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText(/search by name../i), 'test value');
    expect(screen.getByPlaceholderText(/search by name../i)).toHaveValue('test value');
  });

  it('Should add value to local storage on unmount', async (): Promise<void> => {
    localStorage.clear();
    render(<App />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText(/search by name../i), 'new test value');
    const { unmount } = render(<App />, { wrapper: BrowserRouter });
    unmount();
    expect(localStorage.getItem(LOCAL_STORAGE_KEYS.searchValue)).toEqual('new test value');
  });
});
