import React from 'react';
import './MainPage.css';
import SearchBar from '../../components/SearchBar';
import CardList from '../../components/CardList';
import Loader from '../../components/Loader';
import CharactersAPI from '../../api/charactersApi';
import { API_ERROR_MESSAGES, ONE_SECOND } from '../../constants';
import { EmptyObject, IMainPageState, Numbers } from '../../types';

class MainPage extends React.Component<EmptyObject, IMainPageState> {
  charactersApi: CharactersAPI;

  constructor(props: EmptyObject) {
    super(props);
    this.state = {
      cards: [],
      isLoading: true,
      errorMessage: null,
    };
    this.charactersApi = new CharactersAPI();
    this.updateMainPageState = this.updateMainPageState.bind(this);
  }

  async componentDidMount(): Promise<void> {
    await this.updateMainPageState();
  }

  async updateMainPageState(searchParameter?: string): Promise<void> {
    // setTimeout below in this method is added to be able to see loader in case response comes quickly
    if (searchParameter !== undefined) {
      this.setState(() => ({
        isLoading: true,
        errorMessage: null,
      }));
    }
    try {
      const charactersData = searchParameter
        ? await this.charactersApi.getCharacters({
            name: searchParameter,
            page: Numbers.One,
          })
        : await this.charactersApi.getCharacters();
      setTimeout((): void => {
        this.setState(
          (): IMainPageState => ({
            cards: charactersData,
            isLoading: false,
            errorMessage: null,
          })
        );
      }, ONE_SECOND);
    } catch (error) {
      setTimeout((): void => {
        this.setState(
          (): IMainPageState => ({
            cards: [],
            isLoading: false,
            errorMessage: error instanceof Error ? error.message : API_ERROR_MESSAGES.unknown,
          })
        );
      }, ONE_SECOND);
    }
  }

  render(): JSX.Element {
    return (
      <div className="main-wrapper">
        {<SearchBar updateMainPageState={this.updateMainPageState} />}
        {this.state.isLoading && <Loader />}
        {this.state.errorMessage && (
          <div className="main__error-message">{this.state.errorMessage}</div>
        )}
        {!!this.state.cards.length && !this.state.isLoading && !this.state.errorMessage && (
          <CardList characters={this.state.cards} />
        )}
      </div>
    );
  }
}

export default MainPage;
