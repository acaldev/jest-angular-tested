import { StoreConfig, EntityStore } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models';

export interface PokemonState {
  pokemons: Pokemon[];
}

function createInitialState(): PokemonState {
  return { pokemons: [] };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'pokemon' })
export class PokemonsStore extends EntityStore<PokemonState> {
  constructor() {
    super(createInitialState());
  }

  setPokemons(payload: Pokemon[]): void {
    this.update(state => {
      return {
        ...state,
        ...{ pokemons: [...state.pokemons, ...payload] },
      };
    });
  }
}
