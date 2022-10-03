import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '.';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('React Router', (): void => {
  it('Should render main page', (): void => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByPlaceholderText(/search character../i)).toBeInTheDocument();
  });

  it('Should navigate app', async (): Promise<void> => {
    render(<App />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    await user.click(screen.getByText(/about us/i));
    expect(screen.getByText(/welcome to rick and morty characters/i)).toBeInTheDocument();
  });

  it('Should land 404 on a bad page', (): void => {
    const badRoute = '/some/bad/route';
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });

  it('Should adjust active classes on navigation links when switching to the main page', async (): Promise<void> => {
    render(<App />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    await user.click(screen.getByText(/about us/i));
    await user.click(screen.getByText(/main/i));
    expect(screen.getByText(/main/i)).toHaveClass('active');
    expect(screen.getByText(/about us/i)).not.toHaveClass('active');
  });

  it('Should adjust active classes on navigation links when switching to the about us page', async (): Promise<void> => {
    render(<App />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    await user.click(screen.getByText(/about us/i));
    expect(screen.getByText(/main/i)).not.toHaveClass('active');
    expect(screen.getByText(/about us/i)).toHaveClass('active');
  });

  it('Should not contain active class on any navigation link when switching to a bad page', (): void => {
    const badRoute = '/some/bad/route';
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/main/i)).not.toHaveClass('active');
    expect(screen.getByText(/about us/i)).not.toHaveClass('active');
  });
});
