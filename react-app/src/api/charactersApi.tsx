import { createAsyncThunk } from '@reduxjs/toolkit';
import { Numbers, IDataFromApi, IRequestParameters, IRequestReturnedValues } from 'types';
import {
  EMPTY_STRING,
  URL_BASE,
  URL_ENDPOINTS,
  URL_QUERY_KEYS,
  API_ERROR_MESSAGES,
  CARDS_PER_PAGE,
} from '../constants';
import transformPerPageToNumeric from '../utils/transformPerPageToNumeric';
import sortAlphabetically from '../utils/sortAlphabetically';

export const fetchCharacters = createAsyncThunk<
  IRequestReturnedValues,
  IRequestParameters,
  { rejectValue: string }
>(
  'mainPage/fetchCharacters',
  async function getAllApiCharacters(
    {
      name = EMPTY_STRING,
      pageInApi = Numbers.One,
      status = EMPTY_STRING,
      gender = EMPTY_STRING,
      alphabeticalOrder = EMPTY_STRING,
      amountPerPage = EMPTY_STRING,
      currentPage = Numbers.One,
    } = {},
    { rejectWithValue }
  ) {
    const cardsOnPageAmount = transformPerPageToNumeric(amountPerPage);
    if (cardsOnPageAmount === CARDS_PER_PAGE.ten.numericValue) {
      pageInApi = Math.ceil(currentPage / Numbers.Two);
    } else {
      pageInApi = currentPage;
    }
    try {
      const url = `${URL_BASE}/${URL_ENDPOINTS.character}/?${URL_QUERY_KEYS.name}=${name}&${URL_QUERY_KEYS.page}=${pageInApi}&${URL_QUERY_KEYS.status}=${status}&${URL_QUERY_KEYS.gender}=${gender}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(API_ERROR_MESSAGES.charactersNotFound);
      }
      const data: IDataFromApi = await response.json();
      const totalCards: number = data.info.count;
      const totalPages: number = Math.ceil(totalCards / cardsOnPageAmount);
      let allApiCards = data.results;
      if (cardsOnPageAmount === CARDS_PER_PAGE.ten.numericValue) {
        allApiCards =
          currentPage % Numbers.Two === Numbers.Zero
            ? [...allApiCards.slice(CARDS_PER_PAGE.ten.numericValue)]
            : [...allApiCards.slice(Numbers.Zero, CARDS_PER_PAGE.ten.numericValue)];
      }
      sortAlphabetically(allApiCards, alphabeticalOrder);
      return { cards: allApiCards, pagesAmount: totalPages };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : API_ERROR_MESSAGES.unknown);
    }
  }
);
