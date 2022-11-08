import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/testUtils';
import Layout from '.';

describe('Layout', (): void => {
  it('Should render logo', (): void => {
    renderWithProviders(<Layout />);
    expect(screen.getByText(/rick and morty characters/i)).toBeInTheDocument();
  });

  it('Should render navigation', (): void => {
    renderWithProviders(<Layout />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('Should render main page link', (): void => {
    renderWithProviders(<Layout />);
    expect(screen.getByText(/main/i)).toBeInTheDocument();
  });

  it('Should render about page link', (): void => {
    renderWithProviders(<Layout />);
    expect(screen.getByText(/about us/i)).toBeInTheDocument();
  });
});
