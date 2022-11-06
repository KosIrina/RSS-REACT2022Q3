import React, { ChangeEvent, useContext } from 'react';
import Select from '../UI/Select';
import { AppContext } from '../../state/AppState';
import { REDUCER_ACTION_TYPES } from '../../constants';
import { Numbers, IPaginationProps } from '../../types';
import './Pagination.css';

const Pagination = (props: IPaginationProps): JSX.Element => {
  const {
    state: { mainPage },
    dispatch,
  } = useContext(AppContext);

  return (
    <div className="main-page__pagination-container pagination-container">
      <span className="pagination-container__title">Page:</span>
      <Select
        classes={{
          select: 'pagination-container__current-page',
          option: 'pagination-container__page',
        }}
        selectOptions={[...Array(mainPage.pagesAmount + Numbers.One).keys()].slice(Numbers.One)}
        selectedValue={mainPage.currentPage}
        onChange={async (event: ChangeEvent<HTMLSelectElement>): Promise<void> => {
          dispatch({ type: REDUCER_ACTION_TYPES.changePage, payload: event.target.value });
          await props.updateMainPageState({ currentPage: event.target.value });
        }}
      />
      <span className="pagination-container__pages-separator">/</span>
      <span className="pagination-container__pages-total">{mainPage.pagesAmount}</span>
    </div>
  );
};

export default Pagination;
