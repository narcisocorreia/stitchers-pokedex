import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonListResponse } from '../types/pokemon-list-response';
import { Pokemon } from '../types/pokemon';

export interface PokemonQueryParams {
  limit?: number; // Number of Pokémon to retrieve
  offset?: number; // The starting index of the Pokémon to retrieve
}


@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  /**
   * Fetch a list of Pokémon with optional query parameters.
   * @param params Optional query parameters to customize the search.
   * @returns An Observable of the list of Pokémon.
   */
  getPokemonList(params?: PokemonQueryParams): Observable<PokemonListResponse> {
    let httpParams = new HttpParams();

    if (params) {
      if (params.limit !== undefined) {
        httpParams = httpParams.set('limit', params.limit.toString());
      }
      if (params.offset !== undefined) {
        httpParams = httpParams.set('offset', params.offset.toString());
      }
    }

    return this.http.get<PokemonListResponse>(this.apiUrl, { params: httpParams });
  }

  /**
   * Fetch detailed information about a Pokémon by its ID or name.
   * @param idOrName The ID or name of the Pokémon.
   * @returns An Observable of the detailed Pokémon information.
   */
  getPokemonDetail(idOrName: string | number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${idOrName}`);
  }
}
