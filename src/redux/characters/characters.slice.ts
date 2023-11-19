import {createSlice} from '@reduxjs/toolkit';
import {Character, CharacterResponse} from '../../models/Character';
import {fetchAllPeoples} from './characters.thunk';
import {normalizeCharacter} from '../../utils/characters.util';

interface ICharacterState {
  nextPage: boolean;
  prevPage: boolean;
  totalCount: number | null;
  characters: Character[];
  error: null | any;
  loading: boolean;
}

const initialState: ICharacterState = {
  nextPage: true,
  prevPage: false,
  totalCount: null,
  characters: [],
  error: null,
  loading: false,
};

export const charactersSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(fetchAllPeoples.fulfilled, (state, action) => {
        const {next, previous, results, count} = action.payload;

        state.loading = false;

        const normalizedCharacters = results.map(
          (character: CharacterResponse) => normalizeCharacter(character),
        );

        state.characters = normalizedCharacters;
        state.totalCount = count;
        state.nextPage = !!next;
        state.prevPage = !!previous;
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
  reducers: {},
});

export default charactersSlice.reducer;
