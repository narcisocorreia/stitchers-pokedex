import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { ItemsListComponent } from './components/items-list/items-list.component';

const routes: Routes = [
  {
      path: '',
    component: HomePageComponent,
  },
  {
      path: 'pokemon',
      component: PokemonListComponent,
  },
  {
      path: 'items',
      component: ItemsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
