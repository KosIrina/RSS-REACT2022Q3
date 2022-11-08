import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/testUtils';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import server from '../../mocks/server';
import App from '../../components/App';
import { FAKE_CARDS_LENGTH, HTTP_STATUS_CODES, URL_BASE, URL_ENDPOINTS } from '../../constants';
import { Numbers } from '../../types';

describe('Main page', (): void => {
  it('Should render loader while waiting for data from API', async (): Promise<void> => {
    renderWithProviders(<App />);

    const loader = await screen.findByTestId('cards-loader');

    expect(loader).toBeInTheDocument();
    expect(screen.queryAllByTestId('main-page-character-card')).toHaveLength(Numbers.Zero);
    expect(screen.queryByTestId('cards-error-message')).not.toBeInTheDocument();
  });

  it('Should render cards according to API on upload', async (): Promise<void> => {
    renderWithProviders(<App />);

    const cards = await screen.findAllByTestId('main-page-character-card');
    expect(cards.length).toEqual(FAKE_CARDS_LENGTH);
    expect(screen.queryByTestId('cards-loader')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cards-error-message')).not.toBeInTheDocument();
  });

  it('Should render error message on bad API requests', async (): Promise<void> => {
    server.use(
      rest.get(`${URL_BASE}/${URL_ENDPOINTS.character}`, (request, response, context) => {
        return response(context.status(HTTP_STATUS_CODES.notFound));
      })
    );

    renderWithProviders(<App />);

    const errorMessage = await screen.findByTestId('cards-error-message');
    expect(errorMessage).toBeInTheDocument();
    expect(screen.queryByTestId('cards-loader')).not.toBeInTheDocument();
    expect(screen.queryByTestId('main-page-character-card')).not.toBeInTheDocument();
  });

  it('Should render cards after search submit', async (): Promise<void> => {
    renderWithProviders(<App />);
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText(/Search by name../i), 'rick{enter}');

    const cards = await screen.findAllByTestId('main-page-character-card');
    expect(cards).toHaveLength(Numbers.Two);
    expect(screen.queryByTestId('cards-loader')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cards-error-message')).not.toBeInTheDocument();
  });
});
