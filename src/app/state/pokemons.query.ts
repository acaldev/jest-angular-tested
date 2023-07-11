import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { PokemonState, PokemonsStore } from './pokemons.store';
import { Observable } from 'rxjs';
import { Pokemon } from '../models';

@Injectable({ providedIn: 'root' })
export class PokemonsQuery extends Query<PokemonState> {
  constructor(protected override store: PokemonsStore) {
    super(store);
  }

  selectPokemons(): Observable<Pokemon[]> {
    return this.select((state: PokemonState) => state.pokemons);
  }
}
