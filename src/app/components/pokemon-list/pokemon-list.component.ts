import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../types/pokemon';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemonList: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.fetchPokemonList();
  }

  fetchPokemonList(): void {
    this.pokemonService.getPokemonList({ limit: 20 }).subscribe((data) => {
      data.results.forEach((result) => {
        this.pokemonService.getPokemonDetail(result.name).subscribe((pokemon) => {
          this.pokemonList.push(pokemon);
        });
      });
    });
  }

  getGradient(pokemon: Pokemon): string {
    if (pokemon.types.length > 1) {
      return `linear-gradient(135deg, ${this.getTypeColor(pokemon.types[0].type.name)} 0%, ${this.getTypeColor(pokemon.types[1].type.name)} 100%)`;
    } else {
      return this.getTypeColor(pokemon.types[0].type.name);
    }
  }

  getTypeColor(type: string): string {
    switch (type) {
      case 'fire':
        return '#F57D31';
      case 'water':
        return '#6493EB';
      case 'grass':
        return '#74CB48';
      case 'electric':
        return '#F9CF30';
      case 'ice':
        return '#9AD6DF';
      case 'fighting':
        return '#C12239';
      case 'poison':
        return '#A43E9E';
      case 'ground':
        return '#DEC16B';
      case 'flying':
        return '#A891EC';
      case 'psychic':
        return '#FB5584';
      case 'bug':
        return '#A7B723';
      case 'rock':
        return '#B69E31';
      case 'ghost':
        return '#70559B';
      case 'dragon':
        return '#7037FF';
      case 'dark':
        return '#75574C';
      case 'steel':
        return '#B7B9D0';
      case 'fairy':
        return '#E69EAC';
      default:
        return '#A8A77A'; // Default to normal type color
    }
  }
}
