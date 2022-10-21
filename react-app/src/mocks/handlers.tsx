import { rest } from 'msw';
import ApiData from '../data/universe-characters.json';
import {
  URL_BASE,
  HTTP_STATUS_CODES,
  URL_ENDPOINTS,
  EMPTY_STRING,
  FAKE_CARDS_LENGTH,
  URL_QUERY_KEYS,
} from '../constants';
import { Numbers } from '../types';

const handlers = [
  rest.get(`${URL_BASE}/${URL_ENDPOINTS.character}`, (request, response, context) => {
    const name = request.url.searchParams.get(URL_QUERY_KEYS.name) || EMPTY_STRING;

    return response(
      context.status(HTTP_STATUS_CODES.ok),
      context.json({
        info: {
          count: FAKE_CARDS_LENGTH,
          pages: Numbers.One,
          next: null,
          prev: null,
        },
        results: ApiData.filter((cardItem) =>
          cardItem.name.toLowerCase().includes(name.toLowerCase())
        ),
      })
    );
  }),
];

export default handlers;
