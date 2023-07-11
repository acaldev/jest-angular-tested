import { Pokemon } from './pokemon-response.model';

export interface PokemonDetail extends Pokemon {
  evolutions?: Evolution[];
}

interface Evolution {
  id: number;
  name: string;
}
