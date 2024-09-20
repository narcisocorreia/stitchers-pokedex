import { Injectable } from '@angular/core';
import { Pokemon } from '../types/pokemon';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonListService {
  /**
   * Pokemon List Subject and Observable
   */
  private pokemonListSubject: BehaviorSubject<Pokemon[]> =
    new BehaviorSubject<Pokemon[]>([]);
  pokemonListObservable = this.pokemonListSubject.asObservable();

  constructor(private pokemonService: PokemonService) { }

  fetchPokemon() {
  this.pokemonService.getPokemonList().subscribe((data) => {
    const pokemonDetailRequests = data.results.map((result) =>
      this.pokemonService.getPokemonDetail(result.name)
    );

    // Use forkJoin to wait for all detail requests to complete
    forkJoin(pokemonDetailRequests).subscribe((pokemonList: Pokemon[]) => {
      // Emit the completed list of Pokémon
      this.pokemonListSubject.next(pokemonList);
    });
  });
}
}
