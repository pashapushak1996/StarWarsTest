export interface CharacterResponse {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: any[]; // You can define a specific interface for species if needed
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export type CharacterModel = Omit<
  CharacterResponse,
  'edited' | 'created' | 'url'
> & {
  id: string;
};
