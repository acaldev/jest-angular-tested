import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  PokedexResponse,
  EvolutionResponse,
  Pokemon,
  SpeciesResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private url: string = environment.apiUrl + 'pokemon/';

  private _next: string = '';

  get next(): string {
    return this._next;
  }

  set next(next: string) {
    this._next = next;
  }

  constructor(private http: HttpClient) {}

  get(name: string): Observable<Pokemon> {
    const url = `${this.url}${name}`;
    return this.http.get<Pokemon>(url);
  }

  getNext(limit: number = 10): Observable<PokedexResponse> {
    const url = this.next === '' ? `${this.url}?limit=${limit}` : this.next;
    return this.http.get<PokedexResponse>(url);
  }

  getEvolution(id: number): Observable<EvolutionResponse> {
    const url = `${environment.apiUrl}evolution-chain/${id}`;
    return this.http.get<EvolutionResponse>(url);
  }

  getSpecies(name: string): Observable<SpeciesResponse> {
    const url = `${environment.apiUrl}pokemon-species/${name}`;
    return this.http.get<SpeciesResponse>(url);
  }
}
