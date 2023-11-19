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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {created, edited, url, homeworld, species, ...rest} = character;

  const homeworldId = extractId(homeworld) || '';
  const speciesIds = species.length ? species.map(el => extractId(el)) : [];

  const id = extractId(url) || '';

  return {
    ...rest,
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

export const generateImageUri = (
  id: string,
  endpoint: string = 'characters',
) => {
  return `https://starwars-visualguide.com/assets/img/${endpoint}/${id}.jpg`;
};
