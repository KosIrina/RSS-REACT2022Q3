import {
  CustomData,
  Data,
  IAppState,
  ICustomDataElement,
  IFormPageState,
  IMainPageState,
  IFormValues,
  Numbers,
} from '../types';
import { REDUCER_ACTION_TYPES } from '../constants';

const mainPageReducer = (
  state: IMainPageState,
  action: {
    type: string;
    payload?: string | number | Data | CustomData | ICustomDataElement | IFormValues | boolean;
    totalPages?: number;
  }
): IMainPageState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPES.searchByName:
      return {
        ...state,
        currentPage: Numbers.One,
        name: action.payload as string,
      };
    case REDUCER_ACTION_TYPES.callApi:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };
    case REDUCER_ACTION_TYPES.successApi:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        characters: action.payload as Data,
        pagesAmount: action.totalPages as number,
      };
    case REDUCER_ACTION_TYPES.errorApi:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload as string,
        characters: [],
        pagesAmount: Numbers.One,
      };
    case REDUCER_ACTION_TYPES.sortByStatus:
      return {
        ...state,
        currentPage: Numbers.One,
        status: action.payload as string,
      };
    case REDUCER_ACTION_TYPES.sortByGender:
      return {
        ...state,
        currentPage: Numbers.One,
        gender: action.payload as string,
      };
    case REDUCER_ACTION_TYPES.sortAlphabetically:
      return {
        ...state,
        currentPage: Numbers.One,
        alphabeticalOrder: action.payload as string,
      };
    case REDUCER_ACTION_TYPES.changeCardsPerPage:
      return {
        ...state,
        currentPage: Numbers.One,
        cardsPerPage: action.payload as string,
      };
    case REDUCER_ACTION_TYPES.changePage:
      return {
        ...state,
        currentPage: +(action.payload as string),
      };
    default:
      return state;
  }
};

const formPageReducer = (
  state: IFormPageState,
  action: {
    type: string;
    payload?: string | number | Data | CustomData | ICustomDataElement | IFormValues | boolean;
  }
): IFormPageState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPES.updateCustomCards:
      return {
        ...state,
        characters: [action.payload as ICustomDataElement, ...state.characters],
      };
    case REDUCER_ACTION_TYPES.updateFormValues:
      return {
        ...state,
        name: (action.payload as IFormValues).name,
        status: (action.payload as IFormValues).status,
        species: (action.payload as IFormValues).species,
        gender: (action.payload as IFormValues).gender,
        birthday: (action.payload as IFormValues).birthday,
        avatar: (action.payload as IFormValues).avatar,
        agreement: (action.payload as IFormValues).agreement,
      };
    case REDUCER_ACTION_TYPES.updateFormErrors:
      return {
        ...state,
        hasErrors: action.payload as boolean,
      };
    default:
      return state;
  }
};

export const appReducer = (
  { mainPage, formPage }: IAppState,
  action: {
    type: string;
    payload?: string | number | Data | CustomData | ICustomDataElement | IFormValues | boolean;
    totalPages?: number;
  }
): IAppState => ({
  mainPage: mainPageReducer(mainPage, action),
  formPage: formPageReducer(formPage, action),
});
