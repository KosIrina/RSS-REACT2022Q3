import { createAsyncThunk } from '@reduxjs/toolkit';
import { Numbers, Data, IDataFromApi, IRequestParameters, IRequestReturnedValues } from 'types';
import {
  EMPTY_STRING,
  URL_BASE,
  URL_ENDPOINTS,
  URL_QUERY_KEYS,
  API_ERROR_MESSAGES,
} from '../constants';

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
    try {
      const url = `${URL_BASE}/${URL_ENDPOINTS.character}/?${URL_QUERY_KEYS.name}=${name}&${URL_QUERY_KEYS.page}=${pageInApi}&${URL_QUERY_KEYS.status}=${status}&${URL_QUERY_KEYS.gender}=${gender}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(API_ERROR_MESSAGES.charactersNotFound);
      }
      const data: IDataFromApi = await response.json();
      const totalCards: number = data.info.count;
      let allApiCards = data.results;
      if (data.info.next) {
        allApiCards = [
          ...allApiCards,
          ...(
            (await getAllApiCharacters(
              {
                name: name,
                pageInApi: pageInApi + Numbers.One,
                status: status,
                gender: gender,
              },
              { rejectWithValue }
            )) as { allCards: Data; totalCards: number }
          ).allCards,
        ];
      }
      return {
        allCards: allApiCards,
        totalCards: totalCards,
        alphabeticalOrder,
        amountPerPage,
        currentPage,
      };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : API_ERROR_MESSAGES.unknown);
    }
  }
);
