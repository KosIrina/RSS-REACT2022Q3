import React, { ChangeEvent } from 'react';

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

export type Data = IDataElement[];

export interface ICardItemProps {
  character: IDataElement | ICustomDataElement;
}

export interface ICardListProps {
  characters: Data | CustomData;
}

export interface ILocalStorage {
  getItem(key: string): string;
  setItem(key: string, value: string): void;
  clear(): void;
  removeItem(key: string): void;
  getAll(): Record<string, string>;
}

export interface IInputProps {
  classes: {
    container: string;
    label: string;
    input: string;
    error?: string;
  };
  id: string;
  reference: React.RefObject<HTMLInputElement>;
  type: string;
  label?: string;
  errorMessage?: string;
  accept?: string;
  switcher?: boolean;
  isValid?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface ISelectProps {
  classes: {
    container: string;
    label: string;
    select: string;
    option: string;
    error?: string;
  };
  id: string;
  reference: React.RefObject<HTMLSelectElement>;
  values: string[];
  options: string[];
  label?: string;
  errorMessage?: string;
  isValid: boolean;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export interface IButtonProps {
  classes: {
    container: string;
    button: string;
    message?: string;
  };
  type: 'button' | 'reset' | 'submit';
  buttonText: string;
  isDisabled: boolean;
  showMessage?: boolean;
  message?: string;
}

export interface ICustomDataElement {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  birthDate: string;
  avatar: string;
}

export type CustomData = ICustomDataElement[];

export interface IFormPageState {
  cards: CustomData;
}

export interface IFormProps {
  addNewCard: (card: ICustomDataElement) => void;
}

export interface IFormState {
  buttonIsDisabled: boolean;
  name: boolean;
  species: boolean;
  birthday: boolean;
  avatar: boolean;
  agreement: boolean;
  showMessage: boolean;
}
