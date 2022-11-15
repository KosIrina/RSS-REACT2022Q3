import { CARDS_PER_PAGE } from '../constants';

const transformPerPageToNumeric = (perPageValue: string): number => {
  switch (perPageValue) {
    case CARDS_PER_PAGE.twenty.inputValue:
      return CARDS_PER_PAGE.twenty.numericValue;
    default:
      return CARDS_PER_PAGE.ten.numericValue;
  }
};

export default transformPerPageToNumeric;
