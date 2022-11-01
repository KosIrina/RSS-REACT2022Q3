import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../../state/AppState';
import './SearchBar.css';
import { ISearchBarProps, VoidFunction } from '../../types';
import {
  ENTER_KEY_CODES,
  EMPTY_STRING,
  LOCAL_STORAGE_KEYS,
  REDUCER_ACTION_TYPES,
} from '../../constants';

const SearchBar = (props: ISearchBarProps): JSX.Element => {
  const searchInputRef = useRef<string>(
    localStorage.getItem(LOCAL_STORAGE_KEYS.searchValue) || EMPTY_STRING
  );
  const {
    state: { mainPage },
    dispatch,
  } = useContext(AppContext);

  useEffect((): VoidFunction => {
    return (): void => {
      localStorage.setItem(LOCAL_STORAGE_KEYS.searchValue, searchInputRef.current);
    };
  });

  const onFormSubmit = async (event: KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (event.code === ENTER_KEY_CODES.enter || event.code === ENTER_KEY_CODES.enterNumpad) {
      event.preventDefault();
      await props.updateMainPageState(mainPage.name);
    }
  };

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch({ type: REDUCER_ACTION_TYPES.searchByName, payload: event.target.value });
    searchInputRef.current = event.target.value;
  };

  return (
    <>
      <form className="main-page__search-form">
        <input
          type="search"
          className="main-page__search-input"
          placeholder="Search by name.."
          autoComplete="off"
          value={mainPage.name}
          onChange={(event: ChangeEvent<HTMLInputElement>): void => onSearchChange(event)}
          onKeyDown={async (event: KeyboardEvent<HTMLInputElement>): Promise<void> =>
            onFormSubmit(event)
          }
        />
      </form>
    </>
  );
};

export default SearchBar;
