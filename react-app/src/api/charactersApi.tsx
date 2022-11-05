import { Numbers, Data, IDataFromApi, IRequestParameters, IDataElement } from 'types';
import {
  EMPTY_STRING,
  URL_BASE,
  URL_ENDPOINTS,
  URL_QUERY_KEYS,
  API_ERROR_MESSAGES,
  ALPHABETICAL_SORT,
} from '../constants';

export default class CharactersAPI {
  public async getCharacters({
    name = EMPTY_STRING,
    pageInApi = Numbers.One,
    status = EMPTY_STRING,
    gender = EMPTY_STRING,
    alphabeticalOrder = EMPTY_STRING,
  }: IRequestParameters = {}): Promise<Data> {
    const url = `${URL_BASE}/${URL_ENDPOINTS.character}/?${URL_QUERY_KEYS.name}=${name}&${URL_QUERY_KEYS.page}=${pageInApi}&${URL_QUERY_KEYS.status}=${status}&${URL_QUERY_KEYS.gender}=${gender}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(API_ERROR_MESSAGES.charactersNotFound);
    }
    const data: IDataFromApi = await response.json();
    let result = data.results;
    if (data.info.next) {
      result = [
        ...result,
        ...(await this.getCharacters({
          name: name,
          pageInApi: pageInApi + Numbers.One,
          status: status,
          gender: gender,
        })),
      ];
    }
    if (alphabeticalOrder === ALPHABETICAL_SORT.ascending) {
      result.sort((currentCard: IDataElement, nextCard: IDataElement): number =>
        currentCard.name < nextCard.name ? -Numbers.One : Numbers.One
      );
    } else if (alphabeticalOrder === ALPHABETICAL_SORT.descending) {
      result.sort((currentCard: IDataElement, nextCard: IDataElement): number =>
        currentCard.name > nextCard.name ? -Numbers.One : Numbers.One
      );
    }
    return result;
  }
}
