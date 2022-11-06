import { Data, IDataElement, Numbers } from '../types';
import { ALPHABETICAL_SORT } from '../constants';

const sortAlphabetically = (data: Data, sortType: string): void => {
  if (sortType === ALPHABETICAL_SORT.ascending) {
    data.sort((dataItem: IDataElement, nextDataItem: IDataElement): number =>
      dataItem.name < nextDataItem.name ? -Numbers.One : Numbers.One
    );
  } else if (sortType === ALPHABETICAL_SORT.descending) {
    data.sort((dataItem: IDataElement, nextDataItem: IDataElement): number =>
      dataItem.name > nextDataItem.name ? -Numbers.One : Numbers.One
    );
  }
  return;
};

export default sortAlphabetically;
