import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonComponent } from './pokemon.component';
import { PipesModule } from 'src/app/pipes';

@NgModule({
  declarations: [PokemonComponent],
  imports: [CommonModule, PokemonRoutingModule, PipesModule],
})
export class PokemonModule {}
