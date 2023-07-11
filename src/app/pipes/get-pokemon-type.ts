import { Pokemon, PokemonDetail } from '../models';

const getPokemonType = (pokemon: PokemonDetail | Pokemon): string =>
  pokemon && pokemon.types.length > 0 ? pokemon.types[0].type.name : '';

export { getPokemonType };
