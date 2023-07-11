import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { environment } from '../../environments/environment';
import {
  Pokemon,
  PokedexResponse,
  EvolutionResponse,
  SpeciesResponse,
} from '../models';
import {
  mockPokemon,
  mockPokedexResponse,
  mockEvolutionResponse,
  mockSpeciesResponse,
} from '../mocks';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService],
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set next', () => {
    service.next = 'hello world';
    expect(service.next).toBe('hello world');
  });

  it('should retrieve a Pokemon by name', () => {
    const name = 'pikachu';

    service.get(name).subscribe((pokemon: Pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}pokemon/${name}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
    httpMock.verify();
  });

  it('should retrieve the next set of Pokemon with default limit', () => {
    const limit = 10;

    service.getNext().subscribe((pokedexResponse: PokedexResponse) => {
      expect(pokedexResponse).toEqual(mockPokedexResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}pokemon/?limit=${limit}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPokedexResponse);
    httpMock.verify();
  });

  it('should retrieve the next set of Pokemon', () => {
    const limit = 12;

    service.getNext(limit).subscribe((pokedexResponse: PokedexResponse) => {
      expect(pokedexResponse).toEqual(mockPokedexResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}pokemon/?limit=${limit}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPokedexResponse);
    httpMock.verify();
  });

  it('should retrieve the next set of Pokemon with next', () => {
    const limit = 10;
    service.next = 'helloworld';

    service.getNext(limit).subscribe((pokedexResponse: PokedexResponse) => {
      expect(pokedexResponse).toEqual(mockPokedexResponse);
    });

    const req = httpMock.expectOne(`helloworld`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokedexResponse);
    httpMock.verify();
  });

  it('should retrieve the evolution data by ID', () => {
    const id = 123;

    service
      .getEvolution(id)
      .subscribe((evolutionResponse: EvolutionResponse) => {
        expect(evolutionResponse).toEqual(mockEvolutionResponse);
      });

    const req = httpMock.expectOne(
      `${environment.apiUrl}evolution-chain/${id}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockEvolutionResponse);
    httpMock.verify();
  });

  it('should retrieve the species data by name', () => {
    const name = 'charizard';

    service.getSpecies(name).subscribe((speciesResponse: SpeciesResponse) => {
      expect(speciesResponse).toEqual(mockSpeciesResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}pokemon-species/${name}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockSpeciesResponse);
    httpMock.verify();
  });
});
