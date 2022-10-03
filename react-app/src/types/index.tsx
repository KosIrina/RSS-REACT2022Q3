export type SearchBarProps = Record<string, never>;

export interface ISearchBarState {
  inputValue: string;
}

export interface IDataElement {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export type IData = IDataElement[];

export interface ICardItemProps {
  character: IDataElement;
}

export interface ICardListProps {
  characters: IData;
}

export interface ILocalStorage {
  getItem(key: string): string;
  setItem(key: string, value: string): void;
  clear(): void;
  removeItem(key: string): void;
  getAll(): Record<string, string>;
}
