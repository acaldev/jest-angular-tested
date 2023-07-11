import { mockPokemon } from '../mocks';
import { Pokemon } from '../models';
import { getPokemonType } from './get-pokemon-type';

describe('getPokemonType', () => {
  it('getPokemonType to be empty string', () => {
    const type = getPokemonType(null as any as Pokemon);
    expect(type).toBe('');
  });

  it('getPokemonType to be empty string', () => {
    const type = getPokemonType({ types: [] } as any as Pokemon);
    expect(type).toBe('');
  });

  it('getPokemonType to be grass', () => {
    const type = getPokemonType(mockPokemon);
    expect(type).toBe('grass');
  });
});
