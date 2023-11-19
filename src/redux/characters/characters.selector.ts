import {RootState} from '../store';

export const getCharactersState = (state: RootState) => state.characters;

export const getCharacterById = (characterId: string) => (state: RootState) =>
  state.characters.characters.find(character => character.id === characterId);
