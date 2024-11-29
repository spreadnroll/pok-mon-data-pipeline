import { fetchPokemonData } from './fetchPoke.js';
import { initializeDb } from './db.js';  

async function fetchAllPokemons() {
  const db = await initializeDb();  
  const pokemonsData = [];
  const seenPokemon = new Set();

  for (let id = 1; id <= 151; id++) {
    const pokemon = await fetchPokemonData(id);

    
    if (!seenPokemon.has(pokemon.name)) {
      seenPokemon.add(pokemon.name);
      
      pokemonsData.push(pokemon);
    } else {
      console.log(`Pokémon ${pokemon.name} già visto, saltato.`);
    }
  }

  console.log(pokemonsData);
}

fetchAllPokemons();
