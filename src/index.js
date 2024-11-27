import { fetchPokemonData } from './fetchPoke.js';

(async () => {
    const pokemon = await fetchPokemonData(21); //attempt with spearow
    console.log(pokemon);
})();
