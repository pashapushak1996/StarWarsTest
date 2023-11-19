import {apiHandler} from '../utils/api.util';
import {HttpMethods} from '../constants/http-methods.constant';

export const swapiService = {
  getCharacters: async ({page = 1, searchValue = ''}) => {
    const search = searchValue
      ? `?search=${searchValue}&page=${page}`
      : `?page=${page}`;

    return apiHandler('/people' + search, HttpMethods.GET);
  },
  getCharacterById: async (id: string) => {
    return apiHandler(`/people/${id}`, HttpMethods.GET);
  },
  getPlanetById: async (id: string) => {
    return apiHandler(`/planets/${id}`, HttpMethods.GET);
  },
  getSpeciesById: async (id: string) => {
    return apiHandler(`/species/${id}`, HttpMethods.GET);
  },
};
