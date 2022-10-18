import React from 'react';
import { render, screen } from '@testing-library/react';
import MainPage from '.';
import { Numbers } from '../../types';

describe('Main page', (): void => {
  it('Should render loader while waiting for data from API', async (): Promise<void> => {
    render(<MainPage />);

    const loader = await screen.findByTestId('cards-loader');

    expect(loader).toBeInTheDocument();
    expect(screen.queryAllByTestId('main-page-character-card')).toHaveLength(Numbers.Zero);
    expect(screen.queryByTestId('cards-error-message')).not.toBeInTheDocument();
  });
});
