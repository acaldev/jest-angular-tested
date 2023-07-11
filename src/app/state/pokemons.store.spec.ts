import { TestBed } from '@angular/core/testing';
import { PokemonsQuery } from './pokemons.query';
import { PokemonsStore } from './pokemons.store';
import { Pokemon } from '../models';
import { mockPokemon } from '../mocks';

const pokemon: Pokemon = mockPokemon;
const pokemons: Pokemon[] = [];

describe('PokemonsStore', () => {
  let service: PokemonsQuery;
  let store: PokemonsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [PokemonsQuery, PokemonsStore],
    });
    service = TestBed.inject(PokemonsQuery);
    store = TestBed.inject(PokemonsStore);
    store._setState({ pokemons });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should setPokemons', done => {
    store.setPokemons([pokemon]);
    const result = service.selectPokemons();
    result.subscribe(response => {
      expect(response).toStrictEqual([pokemon]);
      done();
    });
  });
});
