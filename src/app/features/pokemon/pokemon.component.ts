import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chain, PokemonDetail } from '../../models';
import { PokemonService } from '../../services';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit, OnDestroy {
  pokemon!: PokemonDetail;

  subscriptions: Subscription[] = [];

  set subscription(value: Subscription) {
    this.subscriptions.push(value);
  }

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params =>
      this.pokemonService.get(params['name']).subscribe(response => {
        this.pokemon = response;
        this.getEvolution();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  getEvolution() {
    if (!this.pokemon.evolutions || !this.pokemon.evolutions.length) {
      this.pokemon.evolutions = [];
      this.pokemonService.getSpecies(this.pokemon.name).subscribe(response => {
        const id = this.getId(response.evolution_chain.url);
        this.pokemonService
          .getEvolution(id)
          .subscribe(response => this.getEvolves(response.chain));
      });
    }
  }

  getEvolves(chain: Chain) {
    const id = this.getId(chain.species.url);
    const name = chain.species.name;
    const newEvolve = [{ id, name }];
    this.pokemon.evolutions = [
      ...(this.pokemon.evolutions || []),
      ...newEvolve,
    ];
    chain.evolves_to.length && this.getEvolves(chain.evolves_to[0]);
  }

  getId(url: string): number {
    const splitUrl = url.split('/');
    return +splitUrl[splitUrl.length - 2];
  }
}
