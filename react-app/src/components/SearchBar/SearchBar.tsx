import React, { ChangeEvent, KeyboardEvent } from 'react';
import './SearchBar.css';
import { ISearchBarProps, ISearchBarState } from '../../types';
import { ENTER_KEY_CODES, EMPTY_STRING, LOCAL_STORAGE_KEYS } from '../../constants';

class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {
  constructor(props: ISearchBarProps) {
    super(props);
    this.state = {
      inputValue: localStorage.getItem(LOCAL_STORAGE_KEYS.searchValue) || EMPTY_STRING,
    };
  }

  componentWillUnmount(): void {
    localStorage.setItem(LOCAL_STORAGE_KEYS.searchValue, this.state.inputValue);
  }

  async onFormSubmit(event: KeyboardEvent<HTMLInputElement>): Promise<void> {
    if (event.code === ENTER_KEY_CODES.enter || event.code === ENTER_KEY_CODES.enterNumpad) {
      event.preventDefault();
      await this.props.updateMainPageState(this.state.inputValue);
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
            placeholder="Search by name.."
            autoComplete="off"
            value={this.state.inputValue}
            onChange={(event: ChangeEvent<HTMLInputElement>): void => this.onSearchChange(event)}
            onKeyDown={async (event: KeyboardEvent<HTMLInputElement>): Promise<void> =>
              this.onFormSubmit(event)
            }
          />
        </form>
      </>
    );
  }
}

export default SearchBar;
