import { Numbers, Data, IDataFromApi, IRequestParameters } from 'types';
import {
  EMPTY_STRING,
  URL_BASE,
  URL_ENDPOINTS,
  URL_QUERY_KEYS,
  API_ERROR_MESSAGES,
} from '../constants';
import sortAlphabetically from '../utils/sortAlphabetically';
import transformPerPageToNumeric from '../utils/transformPerPageToNumeric';

export default class CharactersAPI {
  private async getAllApiCharacters({
    name = EMPTY_STRING,
    pageInApi = Numbers.One,
    status = EMPTY_STRING,
    gender = EMPTY_STRING,
  }: IRequestParameters = {}): Promise<{
    allCards: Data;
    totalCards: number;
  }> {
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
          await this.getAllApiCharacters({
            name: name,
            pageInApi: pageInApi + Numbers.One,
            status: status,
            gender: gender,
          })
        ).allCards,
      ];
    }
    return { allCards: allApiCards, totalCards: totalCards };
  }

  public async getCharacters({
    name = EMPTY_STRING,
    pageInApi = Numbers.One,
    status = EMPTY_STRING,
    gender = EMPTY_STRING,
    alphabeticalOrder = EMPTY_STRING,
    amountPerPage = EMPTY_STRING,
    currentPage = Numbers.One,
  }: IRequestParameters = {}): Promise<{ cards: Data; pagesAmount: number }> {
    const { allCards, totalCards } = await this.getAllApiCharacters({
      name: name,
      pageInApi: pageInApi,
      status: status,
      gender: gender,
    });
    sortAlphabetically(allCards, alphabeticalOrder);
    const cardsOnPageAmount = transformPerPageToNumeric(amountPerPage);
    const totalPages: number = Math.ceil(totalCards / cardsOnPageAmount);
    const cardsOnCurrentPage = allCards.slice(
      (currentPage - Numbers.One) * cardsOnPageAmount,
      currentPage * cardsOnPageAmount
    );
    return { cards: cardsOnCurrentPage, pagesAmount: totalPages };
  }
}
