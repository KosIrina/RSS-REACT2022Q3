import { EMPTY_STRING } from '../constants';
import React, { createContext, ReactNode, useReducer } from 'react';
import { IAppContext, IAppState } from '../types';
import { appReducer } from './AppReducer';

export const AppContext = createContext({} as IAppContext);

export const AppState = ({ children }: { children: ReactNode }): JSX.Element => {
  const initialState: IAppState = {
    mainPage: {
      characters: [],
      name: EMPTY_STRING,
      isLoading: false,
      errorMessage: null,
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
    },
  };
  const [state, dispatch] = useReducer(appReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};
