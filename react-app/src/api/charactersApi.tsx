import { Numbers, Data, IDataFromApi, IRequestParameters } from 'types';
import {
  EMPTY_STRING,
  URL_BASE,
  URL_ENDPOINTS,
  URL_QUERY_KEYS,
  API_ERROR_MESSAGES,
} from '../constants';

export default class CharactersAPI {
  public async getCharacters(
    { name, page }: IRequestParameters = { name: EMPTY_STRING, page: Numbers.One }
  ): Promise<Data> {
    const url = `${URL_BASE}/${URL_ENDPOINTS.character}/?${URL_QUERY_KEYS.name}=${name}&${URL_QUERY_KEYS.page}=${page}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(API_ERROR_MESSAGES.charactersNotFound);
    }
    const data: IDataFromApi = await response.json();
    return data.results;
  }
}
