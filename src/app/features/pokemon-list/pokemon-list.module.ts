import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonListRoutingModule } from './pokemon-list-routing.module';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonListItemComponent } from './pokemon-list-item';
import { PipesModule } from 'src/app/pipes';

@NgModule({
  declarations: [PokemonListComponent, PokemonListItemComponent],
  imports: [CommonModule, PokemonListRoutingModule, PipesModule],
})
export class PokemonListModule {}
