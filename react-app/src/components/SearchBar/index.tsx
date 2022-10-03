import React, { ChangeEvent } from 'react';
import './SearchBar.css';
import { SearchBarProps, SearchBarState } from '../../types';

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      inputValue: localStorage.getItem('searchValue') || '',
    };
  }

  componentWillUnmount(): void {
    localStorage.setItem('searchValue', this.state.inputValue);
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
          />
        </form>
      </>
    );
  }
}

export default SearchBar;
