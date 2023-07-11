import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { mockPokedexResponse, mockPokemon } from '../../mocks';
import { concat, of, take } from 'rxjs';
import { Pokemon } from '../../models';
import { PokemonService } from '../../services';
import { PokemonsQuery, PokemonsStore } from '../../state';
import { PokemonListItemComponent } from './pokemon-list-item';
import { PipesModule } from '../../pipes';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const pokemonServiceStub = {
  next: '',
  getNext: (limit = 10) => of(mockPokedexResponse),
  get: (id: string) => of(mockPokemon),
};

const pokemonsQueryStub = {
  selectPokemons: () => of([mockPokemon]),
};

const pokemonsStoreStub = {
  setPokemons: (pokemons: Pokemon[]) => {},
};

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonListComponent],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceStub },
        { provide: PokemonsQuery, useValue: pokemonsQueryStub },
        { provide: PokemonsStore, useValue: pokemonsStoreStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnDestroy();
    jest.resetAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit call loadMore', () => {
    const spyLoadMore = jest.spyOn(component, 'loadMore');
    component.ngOnInit();
    expect(spyLoadMore).toHaveBeenCalled();
  });

  it('should ngOnDestroy call subscriptions unsubscribe', () => {
    component.ngOnInit();
    const sub = of(null).subscribe();
    const spyUnsubscribe = jest.spyOn(sub, 'unsubscribe');
    const subs = [sub];
    component.subscriptions = subs;
    component.ngOnDestroy();
    expect(spyUnsubscribe).toHaveBeenCalled();
  });

  it('should loadMore', done => {
    const spyPokemonStore = jest.spyOn(pokemonsStoreStub, 'setPokemons');
    component.loadMore();
    pokemonServiceStub.getNext().subscribe(response => {
      expect(pokemonServiceStub.next).toBe(response.next);
      const details = response.results.map(i => pokemonServiceStub.get(i.name));
      concat(...details)
        .pipe(take(1))
        .subscribe(resConcat => {
          expect(pokemonsStoreStub.setPokemons).toHaveBeenCalledWith([
            resConcat,
          ]);
          done();
        });
    });
  });
});
