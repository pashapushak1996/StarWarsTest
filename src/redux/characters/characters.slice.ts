import {createSlice} from '@reduxjs/toolkit';
import {CharacterModel, CharacterResponse} from '../../models/character.model';
import {fetchAllPeoples} from './characters.thunk';
import {normalizeCharacter} from '../../utils/characters.util';

interface ICharacterState {
  page: number;
  totalCount: number | null;
  characters: CharacterModel[];
  error: null | any;
  loading: boolean;
}

const initialState: ICharacterState = {
  page: 0,
  totalCount: null,
  characters: [],
  error: null,
  loading: false,
};

export const charactersSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(fetchAllPeoples.fulfilled, (state, action) => {
        const {results, count} = action.payload;

        state.loading = false;

        const normalizedCharacters = results.map(
          (character: CharacterResponse) => normalizeCharacter(character),
        );

        state.characters = normalizedCharacters;
        state.totalCount = count;
      })
      .addCase(fetchAllPeoples.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAllPeoples.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
  initialState,
  name: 'characters',
  reducers: {
    setCurrentPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const {setCurrentPage} = charactersSlice.actions;

export default charactersSlice.reducer;
