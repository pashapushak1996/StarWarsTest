import {createAsyncThunk} from '@reduxjs/toolkit';
import {swapiService} from '../../services/swapi.service';
import {PeopleRequest} from '../../models/api.model';

export const fetchAllPeoples = createAsyncThunk(
  'characters/fetchAll',
  async (queryParams: PeopleRequest, {rejectWithValue}) => {
    try {
      const response = await swapiService.getCharacters(queryParams);

      return response.data;
    } catch (e) {
      // @ts-ignore
      return rejectWithValue(e.response.data);
    }
  },
);
