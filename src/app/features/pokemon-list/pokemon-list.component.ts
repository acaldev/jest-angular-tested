import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, concat } from 'rxjs';
import { Pokemon } from '../../models';
import { PokemonService } from '../../services';
import { PokemonsQuery, PokemonsStore } from '../../state';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit, OnDestroy {
  loading: boolean = false;

  subscriptions: Subscription[] = [];

  set subscription(value: Subscription) {
    this.subscriptions.push(value);
  }

  constructor(
    private pokemonService: PokemonService,
    private pokemonsQuery: PokemonsQuery,
    private pokemonStore: PokemonsStore
  ) {}

  pokemons$: Observable<Pokemon[]> = this.pokemonsQuery.selectPokemons();

  ngOnInit(): void {
    this.loadMore();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  loadMore(): void {
    this.loading = true;
    this.subscription = this.pokemonService.getNext().subscribe({
      next: response => {
        this.pokemonService.next = response.next;
        const details = response.results.map(i =>
          this.pokemonService.get(i.name)
        );
        concat(...details).subscribe(response =>
          this.pokemonStore.setPokemons([response])
        );
      },
      complete: () => (this.loading = false),
    });
  }
}
