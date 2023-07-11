export interface SpeciesResponse {
    base_happiness:         number;
    capture_rate:           number;
    color:                  Color;
    egg_groups:             Color[];
    evolution_chain:        EvolutionChain;
    evolves_from_species:   null;
    flavor_text_entries:    FlavorTextEntry[];
    form_descriptions:      any[];
    forms_switchable:       boolean;
    gender_rate:            number;
    genera:                 Genus[];
    generation:             Color;
    growth_rate:            Color;
    habitat:                Color;
    has_gender_differences: boolean;
    hatch_counter:          number;
    id:                     number;
    is_baby:                boolean;
    is_legendary:           boolean;
    is_mythical:            boolean;
    name:                   string;
    names:                  Name[];
    order:                  number;
    pal_park_encounters:    PalParkEncounter[];
    pokedex_numbers:        PokedexNumber[];
    shape:                  Color;
    varieties:              Variety[];
}

interface Color {
    name: string;
    url:  string;
}

interface EvolutionChain {
    url: string;
}

interface FlavorTextEntry {
    flavor_text: string;
    language:    Color;
    version:     Color;
}

interface Genus {
    genus:    string;
    language: Color;
}

interface Name {
    language: Color;
    name:     string;
}

interface PalParkEncounter {
    area:       Color;
    base_score: number;
    rate:       number;
}

interface PokedexNumber {
    entry_number: number;
    pokedex:      Color;
}

interface Variety {
    is_default: boolean;
    pokemon:    Color;
}
