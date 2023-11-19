import {createSlice} from '@reduxjs/toolkit';

import {Character} from '../../models/Character';

interface ICharactersState {
  fans: Character[];
}

const initialState: ICharactersState = {
  fans: [],
};

export const fansSlice = createSlice({
  name: 'fans',
  initialState,
  reducers: {
    addFun: (state, action) => {
      const exist = state.fans.find(fan => fan.id === action.payload.id);

      if (exist) {
        state.fans = state.fans.filter(fan => fan.id !== action.payload.id);

        return;
      }
      state.fans.push(action.payload);
    },
    clearFans: state => {
      state.fans = [];
    },
  },
});

export const {addFun, clearFans} = fansSlice.actions;

export default fansSlice.reducer;
