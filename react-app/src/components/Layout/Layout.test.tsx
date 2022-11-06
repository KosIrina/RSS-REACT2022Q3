import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

describe('Layout', (): void => {
  it('Should render logo', (): void => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByText(/rick and morty characters/i)).toBeInTheDocument();
  });

  it('Should render navigation', (): void => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('Should render main page link', (): void => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByText(/main/i)).toBeInTheDocument();
  });

  it('Should render about page link', (): void => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByText(/about us/i)).toBeInTheDocument();
  });
});
