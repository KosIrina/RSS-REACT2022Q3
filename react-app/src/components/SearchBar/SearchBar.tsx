import React, { ChangeEvent, KeyboardEvent } from 'react';
import './SearchBar.css';
import { EmptyObject, ISearchBarState } from '../../types';
import { ENTER_KEY_CODES, EMPTY_STRING, LOCAL_STORAGE_KEYS } from '../../constants';

class SearchBar extends React.Component<EmptyObject, ISearchBarState> {
  constructor(props: EmptyObject) {
    super(props);
    this.state = {
      inputValue: localStorage.getItem(LOCAL_STORAGE_KEYS.searchValue) || EMPTY_STRING,
    };
  }

  componentWillUnmount(): void {
    localStorage.setItem(LOCAL_STORAGE_KEYS.searchValue, this.state.inputValue);
  }

  onFormSubmit(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.code === ENTER_KEY_CODES.enter || event.code === ENTER_KEY_CODES.enterNumpad) {
      event.preventDefault();
    }
  }

  onSearchChange(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({ inputValue: event.target.value });
  }

  render(): JSX.Element {
    return (
      <>
        <form className="main-page__search-form">
          <input
            type="search"
            className="main-page__search-input"
            placeholder="Search character.."
            autoComplete="off"
            value={this.state.inputValue}
            onChange={(event: ChangeEvent<HTMLInputElement>): void => this.onSearchChange(event)}
            onKeyDown={(event: KeyboardEvent<HTMLInputElement>): void => this.onFormSubmit(event)}
          />
        </form>
      </>
    );
  }
}

export default SearchBar;
