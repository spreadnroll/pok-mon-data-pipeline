import { fetchPokemonData } from './fetchPoke.js';

(async () => {
    const pokemon = await fetchPokemonData(23); "first attempt with ekans"
    console.log(pokemon);
})();
