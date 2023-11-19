import {Character, CharacterResponse} from '../models/Character';

export const getCharactersByGender = (
  gender: 'female' | 'male' | 'others',
  characters: Character[],
) =>
  characters.filter(character => {
    if (gender === 'others') {
      return !['female', 'male'].includes(character.gender);
    }

    return character.gender === gender;
  });

export const normalizeCharacter = (character: CharacterResponse): Character => {
  const {name, birth_year, gender, homeworld, species, url} = character;

  const homeworldId = extractId(homeworld) || '';
  const speciesIds = species.length ? species.map(el => extractId(el)) : [];

  const id = extractId(url) || '';

  return {
    name,
    birth_year,
    gender,
    homeworld: homeworldId,
    species: speciesIds,
    id,
  };
};

const extractId = (url: string) => {
  return url
    .split('/')
    .filter(el => el)
    .pop();
};
