// Interface for detailed Pokemon information
export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  abilities: Array<{ ability: { name: string; url: string }; is_hidden: boolean; slot: number }>;
  forms: Array<{ name: string; url: string }>;
  game_indices: Array<{ game_index: number; version: { name: string; url: string } }>;
  held_items: Array<{ item: { name: string; url: string }; version_details: Array<{ version: { name: string; url: string }; rarity: number }> }>;
  location_area_encounters: string;
  moves: Array<{ move: { name: string; url: string }; version_group_details: Array<{ level_learned_at: number; version_group: { name: string; url: string }; move_learn_method: { name: string; url: string } }> }>;
  species: { name: string; url: string };
  sprites: { front_default: string; other: { [key: string]: { front_default: string } } };
  stats: Array<{ base_stat: number; effort: number; stat: { name: string; url: string } }>;
  types: Array<{ slot: number; type: { name: string; url: string } }>;
}
