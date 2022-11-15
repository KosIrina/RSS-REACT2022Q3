import React, { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../customHooks';
import { searchByName } from '../../state/AppReducer';
import './SearchBar.css';
import { ISearchBarProps, VoidFunction, Numbers } from '../../types';
import { ENTER_KEY_CODES, EMPTY_STRING, LOCAL_STORAGE_KEYS } from '../../constants';

const SearchBar = (props: ISearchBarProps): JSX.Element => {
  const searchInputRef = useRef<string>(
    localStorage.getItem(LOCAL_STORAGE_KEYS.searchValue) || EMPTY_STRING
  );
  const state = useAppSelector((state) => state.mainState);
  const dispatch = useAppDispatch();

  useEffect((): VoidFunction => {
    return (): void => {
      localStorage.setItem(LOCAL_STORAGE_KEYS.searchValue, searchInputRef.current);
    };
  });

  const onFormSubmit = async (event: KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (event.code === ENTER_KEY_CODES.enter || event.code === ENTER_KEY_CODES.enterNumpad) {
      event.preventDefault();
      props.updateMainPageState({ name: state.name, currentPage: Numbers.One });
    }
  };

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(searchByName(event.target.value));
    searchInputRef.current = event.target.value;
  };

  return (
    <>
      <div className="main-page__search-bar">
        <input
          type="search"
          className="main-page__search-input"
          placeholder="Search by name.."
          autoComplete="off"
          value={state.name}
          onChange={(event: ChangeEvent<HTMLInputElement>): void => onSearchChange(event)}
          onKeyDown={async (event: KeyboardEvent<HTMLInputElement>): Promise<void> =>
            onFormSubmit(event)
          }
        />
      </div>
    </>
  );
};

export default SearchBar;
