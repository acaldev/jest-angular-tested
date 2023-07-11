import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from './image.pipe';
import { GetPokemonTypePipe } from './get-pokemon-type.pipe';

@NgModule({
  declarations: [ImagePipe, GetPokemonTypePipe],
  imports: [CommonModule],
  exports: [ImagePipe, GetPokemonTypePipe],
})
export class PipesModule {}
