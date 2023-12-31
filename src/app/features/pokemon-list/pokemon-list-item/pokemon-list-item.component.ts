import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css'],
})
export class PokemonListItemComponent {
  @Input() pokemon!: Pokemon;
}
