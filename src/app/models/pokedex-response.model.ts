export interface PokedexResponse {
    count:    number;
    next:     string;
    previous: null;
    results:  PokedexPokemon[];
}

export interface PokedexPokemon {
    name: string;
    url:  string;
}