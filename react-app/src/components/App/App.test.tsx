import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/testUtils';
import App from '.';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('React Router', (): void => {
  it('Should render main page', (): void => {
    renderWithProviders(<App />);
    expect(screen.getByPlaceholderText(/search by name../i)).toBeInTheDocument();
  });

  it('Should navigate app', async (): Promise<void> => {
    renderWithProviders(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByText(/about us/i));
    expect(screen.getByText(/welcome to rick and morty characters/i)).toBeInTheDocument();
  });

  it('Should render form page', async (): Promise<void> => {
    renderWithProviders(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByText('Form'));
    expect(screen.getByText(/here you can create your own character/i)).toBeInTheDocument();
  });

  it('Should land 404 on a bad page', (): void => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>,
      false
    );
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });

  it('Should adjust active classes on navigation links when switching to the main page', async (): Promise<void> => {
    renderWithProviders(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByText(/about us/i));
    await user.click(screen.getByText(/main/i));
    expect(screen.getByText(/main/i)).toHaveClass('active');
    expect(screen.getByText(/about us/i)).not.toHaveClass('active');
  });

  it('Should adjust active classes on navigation links when switching to the about us page', async (): Promise<void> => {
    renderWithProviders(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByText(/about us/i));
    expect(screen.getByText(/main/i)).not.toHaveClass('active');
    expect(screen.getByText(/about us/i)).toHaveClass('active');
  });

  it('Should not contain active class on any navigation link when switching to a bad page', (): void => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>,
      false
    );
    expect(screen.getByText(/main/i)).not.toHaveClass('active');
    expect(screen.getByText(/about us/i)).not.toHaveClass('active');
  });
});
