import React, { ChangeEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../customHooks';
import { changePage } from '../../state/AppReducer';
import Select from '../UI/Select';
import { Numbers, IPaginationProps } from '../../types';
import './Pagination.css';

const Pagination = (props: IPaginationProps): JSX.Element => {
  const state = useAppSelector((state) => state.mainState);
  const dispatch = useAppDispatch();

  return (
    <div className="main-page__pagination-container pagination-container">
      <span className="pagination-container__title">Page:</span>
      <Select
        classes={{
          select: 'pagination-container__current-page',
          option: 'pagination-container__page',
        }}
        selectOptions={[...Array(state.pagesAmount + Numbers.One).keys()].slice(Numbers.One)}
        selectedValue={state.currentPage}
        onChange={async (event: ChangeEvent<HTMLSelectElement>): Promise<void> => {
          dispatch(changePage(event.target.value));
          await props.updateMainPageState({ currentPage: event.target.value });
        }}
      />
      <span className="pagination-container__pages-separator">/</span>
      <span className="pagination-container__pages-total">{state.pagesAmount}</span>
    </div>
  );
};

export default Pagination;
