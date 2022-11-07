import { configureStore } from '@reduxjs/toolkit';
import { mainPageReducer, formPageReducer } from './AppReducer';

const store = configureStore({
  reducer: {
    mainState: mainPageReducer,
    formState: formPageReducer,
  },
});

export default store;
