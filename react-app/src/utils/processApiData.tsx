import { Data, Numbers, IRequestReturnedValues } from '../types';
import sortAlphabetically from './sortAlphabetically';
import transformPerPageToNumeric from './transformPerPageToNumeric';

const procesApiData = ({
  allCards,
  totalCards,
  alphabeticalOrder,
  amountPerPage,
  currentPage,
}: IRequestReturnedValues): { cards: Data; pagesAmount: number } => {
  sortAlphabetically(allCards, alphabeticalOrder);
  const cardsOnPageAmount = transformPerPageToNumeric(amountPerPage);
  const totalPages: number = Math.ceil(totalCards / cardsOnPageAmount);
  const cardsOnCurrentPage = allCards.slice(
    (currentPage - Numbers.One) * cardsOnPageAmount,
    currentPage * cardsOnPageAmount
  );
  return { cards: cardsOnCurrentPage, pagesAmount: totalPages };
};

export default procesApiData;
