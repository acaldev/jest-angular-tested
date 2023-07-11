import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PokemonComponent } from './pokemon.component';
import { PipesModule } from '../../pipes';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PokemonService } from '../../services';
import {
  mockEvolutionResponse,
  mockPokemon,
  mockSpeciesResponse,
} from '../../mocks';

const activatedRouteStub = {
  params: of({ name: 'bulbasour' }),
};

const pokemonServiceStub = {
  get: () => of(mockPokemon),
  getSpecies: () => of(mockSpeciesResponse),
  getEvolution: () => of(mockEvolutionResponse),
};

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonComponent],
      imports: [PipesModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: PokemonService, useValue: pokemonServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jest.resetAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit call route params, pokemonService and set pokemon', done => {
    const getEvolutionSpy = jest.spyOn(component, 'getEvolution');

    component.ngOnInit();

    activatedRouteStub.params.subscribe(() => {
      pokemonServiceStub.get().subscribe(response => {
        expect(component.pokemon).toBe(response);
        expect(getEvolutionSpy).toHaveBeenCalled();
        done();
      });
    });
  });

  it('should ngOnDestroy call subscriptions unsubscribe', () => {
    const sub = of(null).subscribe();
    const spyUnsubscribe = jest.spyOn(sub, 'unsubscribe');
    const subs = [sub];
    component.subscriptions = subs;
    component.ngOnDestroy();
    expect(spyUnsubscribe).toHaveBeenCalled();
  });

  it('should getEvolution call getSpecies and getEvolution', done => {
    const spyGetEvolves = jest.spyOn(component, 'getEvolves');
    const spyGetId = jest.spyOn(component, 'getId').mockReturnValue(1);
    component.ngOnInit();
    component.pokemon.evolutions = [];
    component.getEvolution();

    pokemonServiceStub.getSpecies().subscribe(() => {
      expect(spyGetId).toHaveBeenCalled();
      pokemonServiceStub.getEvolution().subscribe(() => {
        expect(spyGetEvolves).toHaveBeenCalled();
        expect(spyGetEvolves).toHaveBeenCalledWith(mockEvolutionResponse.chain);
        done();
      });
    });
  });

  it('should getEvolution not call getSpecies and getEvolution', () => {
    component.ngOnInit();
    component.getEvolves(mockEvolutionResponse.chain);
    const spyGetEvolves = jest.spyOn(component, 'getEvolves');
    const spyGetId = jest.spyOn(component, 'getId').mockReturnValue(1);
    component.getEvolution();
    expect(spyGetEvolves).not.toHaveBeenCalled();
    expect(spyGetId).not.toHaveBeenCalled();
  });

  it('should getEvolves', () => {
    const spyGetId = jest.spyOn(component, 'getId').mockReturnValue(1);
    component.pokemon = mockPokemon;
    component.pokemon.evolutions = [];
    fixture.detectChanges();
    component.getEvolves(mockEvolutionResponse.chain);
    expect(spyGetId).toHaveBeenCalled();
    expect(component.pokemon.evolutions).toStrictEqual([
      {
        id: 1,
        name: 'bulbasaur',
      },
      {
        id: 1,
        name: 'ivysaur',
      },
      {
        id: 1,
        name: 'venusaur',
      },
    ]);
  });

  it('should getEvolves with no evolutions', () => {
    const spyGetId = jest.spyOn(component, 'getId').mockReturnValue(1);
    component.pokemon = mockPokemon;
    component.pokemon.evolutions = undefined;
    fixture.detectChanges();
    component.getEvolves(mockEvolutionResponse.chain);
    expect(spyGetId).toHaveBeenCalled();
    expect(component.pokemon.evolutions).toStrictEqual([
      {
        id: 1,
        name: 'bulbasaur',
      },
      {
        id: 1,
        name: 'ivysaur',
      },
      {
        id: 1,
        name: 'venusaur',
      },
    ]);
  });

  it('should getId', () => {
    const result = component.getId(
      'https://pokeapi.co/api/v2/pokemon-species/3/'
    );
    expect(result).toBe(3);
  });
});
