import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ICustomDataElement,
  IFormPageState,
  IMainPageState,
  IFormValues,
  Numbers,
  IDataElement,
} from '../types';
import { LOCAL_STORAGE_KEYS, EMPTY_STRING } from '../constants';
import { fetchCharacters } from '../api/charactersApi';

const initialMainPageState: IMainPageState = {
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
  selectedCharacter: null,
};

const mainPageSlice = createSlice({
  name: 'mainPage',
  initialState: initialMainPageState,
  reducers: {
    searchByName(state, action: PayloadAction<string>) {
      state.currentPage = Numbers.One;
      state.name = action.payload;
    },
    sortByStatus(state, action: PayloadAction<string>) {
      state.currentPage = Numbers.One;
      state.status = action.payload;
    },
    sortByGender(state, action: PayloadAction<string>) {
      state.currentPage = Numbers.One;
      state.gender = action.payload;
    },
    sortAlphabetically(state, action: PayloadAction<string>) {
      state.alphabeticalOrder = action.payload;
    },
    changeCardsPerPage(state, action: PayloadAction<string>) {
      state.currentPage = Numbers.One;
      state.cardsPerPage = action.payload;
    },
    changePage(state, action: PayloadAction<string>) {
      state.currentPage = +action.payload;
    },
    updateSelectedCard(state, action: PayloadAction<IDataElement | null>) {
      state.selectedCharacter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = null;
        state.characters = action.payload.cards;
        state.pagesAmount = action.payload.pagesAmount;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload as string;
        state.characters = [];
        state.pagesAmount = Numbers.One;
      });
  },
});

const initialFormPageState: IFormPageState = {
  characters: [],
  name: EMPTY_STRING,
  status: false,
  species: EMPTY_STRING,
  gender: false,
  birthday: EMPTY_STRING,
  agreement: false,
  hasErrors: false,
  selectedCharacter: null,
};

const formPageSlice = createSlice({
  name: 'formPage',
  initialState: initialFormPageState,
  reducers: {
    updateCustomCards(state, action: PayloadAction<ICustomDataElement>) {
      state.characters.unshift(action.payload);
    },
    updateFormValues(state, action: PayloadAction<Omit<IFormValues, 'avatar'>>) {
      state.name = action.payload.name;
      state.status = action.payload.status;
      state.species = action.payload.species;
      state.gender = action.payload.gender;
      state.birthday = action.payload.birthday;
      state.agreement = action.payload.agreement;
    },
    updateFormErrors(state, action: PayloadAction<boolean>) {
      state.hasErrors = action.payload;
    },
    updateSelectedCustomCard(state, action: PayloadAction<ICustomDataElement | null>) {
      state.selectedCharacter = action.payload;
    },
  },
});

export const {
  searchByName,
  sortByStatus,
  sortByGender,
  sortAlphabetically,
  changeCardsPerPage,
  changePage,
  updateSelectedCard,
} = mainPageSlice.actions;
export const { updateCustomCards, updateFormValues, updateFormErrors, updateSelectedCustomCard } =
  formPageSlice.actions;
export const mainPageReducer = mainPageSlice.reducer;
export const formPageReducer = formPageSlice.reducer;
