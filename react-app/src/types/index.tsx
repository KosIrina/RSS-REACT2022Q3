import { ChangeEvent } from 'react';
import { FieldErrorsImpl } from 'react-hook-form';
import store, { rootReducer } from '../state/AppState';

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

export type Data = IDataElement[];

export interface ICardItemProps {
  character: IDataElement | ICustomDataElement;
  showFullInfo: boolean;
}

export interface ILocalStorage {
  getItem(key: string): string;
  setItem(key: string, value: string): void;
  clear(): void;
  removeItem(key: string): void;
  getAll(): Record<string, string>;
}

export interface IFormValues {
  name: string;
  status: boolean;
  species: string;
  gender: boolean;
  birthday: string;
  avatar: FileList | null;
  agreement: boolean;
}

export interface IButtonProps {
  classes: {
    container: string;
    button: string;
    message?: string;
  };
  type: 'button' | 'reset' | 'submit';
  buttonText: string;
  isDisabled?: boolean;
  showMessage?: boolean;
  message?: string;
  onClick?: VoidFunction;
}

export interface ICustomDataElement {
  id: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  birthDate: string;
  avatar: string;
}

export type CustomData = ICustomDataElement[];

export enum Numbers {
  Zero = 0,
  One,
  Two,
  Four = 4,
}

export interface ISearchBarProps {
  updateMainPageState: (newSearchParameter?: Record<string, unknown>) => void;
}

export interface IDataFromApi {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: number | null;
  };
  results: Data;
}

export interface IRequestParameters {
  name?: string;
  pageInApi?: number;
  status?: string;
  gender?: string;
  alphabeticalOrder?: string;
  amountPerPage?: string;
  currentPage?: number;
}

export type VoidFunction = () => void;

export interface IMainPageState {
  characters: Data;
  name: string;
  isLoading: boolean;
  errorMessage: string | null;
  status: string;
  gender: string;
  alphabeticalOrder: string;
  cardsPerPage: string;
  pagesAmount: number;
  currentPage: number;
  selectedCharacter: IDataElement | null;
}

export interface IFormPageState extends Omit<IFormValues, 'avatar'> {
  characters: CustomData;
  hasErrors: boolean;
  selectedCharacter: ICustomDataElement | null;
}

export type FormErrors = Partial<
  FieldErrorsImpl<{
    name: string;
    status: boolean;
    species: string;
    gender: boolean;
    birthday: string;
    avatar: FileList;
    agreement: boolean;
  }>
>;

export interface ISelectProps {
  classes: {
    select: string;
    option: string;
  };
  selectOptions: string[] | number[];
  selectedValue: string | number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export interface ICardsSortingProps {
  updateMainPageState: (newSearchParameter?: Record<string, unknown>) => void;
}

export interface IPaginationProps {
  updateMainPageState: (newSearchParameter?: Record<string, unknown>) => void;
}

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof store>;

export type AppDispatch = AppStore['dispatch'];

export interface IRequestReturnedValues {
  cards: Data;
  pagesAmount: number;
}
