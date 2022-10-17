import { URL_BASE, HTTP_STATUS_CODES } from '../constants';
import { rest } from 'msw';
import ApiData from '../data/universe-characters.json';

const handlers = [
  rest.get(URL_BASE, (request, response, context) => {
    return response(context.status(HTTP_STATUS_CODES.ok), context.json(ApiData));
  }),
];

export default handlers;
