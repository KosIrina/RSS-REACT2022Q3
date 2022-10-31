import { CustomData, Data, IAppState, IFormPageState, IMainPageState } from '../types';
import { REDUCER_ACTION_TYPES } from '../constants';

const mainPageReducer = (
  state: IMainPageState,
  action: { type: string; payload?: string | number | Data | CustomData }
): IMainPageState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPES.searchByName:
      return {
        ...state,
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
      };
    case REDUCER_ACTION_TYPES.errorApi:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload as string,
        characters: [],
      };
    default:
      return state;
  }
};

const formPageReducer = (
  state: IFormPageState,
  action: { type: string; payload?: string | number | Data | CustomData }
): IFormPageState => {
  switch (action.type) {
    default:
      return state;
  }
};

export const appReducer = (
  { mainPage, formPage }: IAppState,
  action: { type: string; payload?: string | number | Data | CustomData }
): IAppState => ({
  mainPage: mainPageReducer(mainPage, action),
  formPage: formPageReducer(formPage, action),
});
