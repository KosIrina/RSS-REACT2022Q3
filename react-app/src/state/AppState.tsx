import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { mainPageReducer, formPageReducer } from './AppReducer';
import { RootState } from '../types';

export const rootReducer = combineReducers({
  mainState: mainPageReducer,
  formState: formPageReducer,
});

const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export default setupStore;
