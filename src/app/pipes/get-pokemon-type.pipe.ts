import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon, PokemonDetail } from '../models';
import { getPokemonType } from './get-pokemon-type';

@Pipe({
  name: 'getPokemonType',
})
export class GetPokemonTypePipe implements PipeTransform {
  transform(pokemon: PokemonDetail | Pokemon): string {
    return getPokemonType(pokemon);
  }
}
