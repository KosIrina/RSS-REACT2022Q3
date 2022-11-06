import React, { createContext, ReactNode, useReducer } from 'react';
import { IAppContext, IAppState, Numbers } from '../types';
import { EMPTY_STRING, LOCAL_STORAGE_KEYS } from '../constants';
import { appReducer } from './AppReducer';

export const AppContext = createContext({} as IAppContext);

export const AppState = ({ children }: { children: ReactNode }): JSX.Element => {
  const initialState: IAppState = {
    mainPage: {
      characters: [],
      name: localStorage.getItem(LOCAL_STORAGE_KEYS.searchValue) || EMPTY_STRING,
      isLoading: false,
      errorMessage: null,
      status: EMPTY_STRING,
      gender: EMPTY_STRING,
      alphabeticalOrder: EMPTY_STRING,
      cardsPerPage: EMPTY_STRING,
      pagesAmount: Numbers.One,
      currentPage: Numbers.One,
    },
    formPage: {
      characters: [],
      name: EMPTY_STRING,
      status: false,
      species: EMPTY_STRING,
      gender: false,
      birthday: EMPTY_STRING,
      avatar: null,
      agreement: false,
      hasErrors: false,
    },
  };
  const [state, dispatch] = useReducer(appReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};
