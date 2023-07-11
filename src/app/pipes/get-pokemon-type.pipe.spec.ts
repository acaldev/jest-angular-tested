import { mockPokemon } from '../mocks';
import * as getPokemon from './get-pokemon-type';
import { GetPokemonTypePipe } from './get-pokemon-type.pipe';

describe('GetPokemonTypePipe', () => {
  let pipe: GetPokemonTypePipe;

  beforeEach(() => {
    pipe = new GetPokemonTypePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform the value call getPokemonType', () => {
    const getPokemonTypeSpy = jest
      .spyOn(getPokemon, 'getPokemonType')
      .mockReturnValue('grass');
    const result = pipe.transform(mockPokemon);
    expect(result).toBe('grass');
    expect(getPokemonTypeSpy).toHaveBeenCalled();
  });
});
