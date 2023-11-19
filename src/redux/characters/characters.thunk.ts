import {createAsyncThunk} from '@reduxjs/toolkit';
import {swapiService} from '../../services/swapi.service';
import {QueryParams} from '../../models/api.model';

export const fetchAllPeoples = createAsyncThunk(
  'characters/fetchAll',
  async (queryParams: QueryParams, {rejectWithValue}) => {
    try {
      const response = await swapiService.getCharacters(queryParams);

      return response.data;
    } catch (e) {
      // @ts-ignore
      return rejectWithValue(e.response.data);
    }
  },
);
