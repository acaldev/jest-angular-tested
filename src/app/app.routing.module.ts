import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/pokemon-list/pokemon-list.module').then(
        m => m.PokemonListModule
      ),
  },
  {
    path: 'view/:name',
    loadChildren: () =>
      import('./features/pokemon/pokemon.module').then(m => m.PokemonModule),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
