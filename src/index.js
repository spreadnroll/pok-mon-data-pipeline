import { fetchPokemonData } from './fetchPoke.js';

async function fetchAllPokemons() {
  const pokemonsData = [];
  for (let id = 1; id <= 151; id++) {
    const pokemon = await fetchPokemonData(id);
    pokemonsData.push(pokemon);
  }
  console.log(pokemonsData);
}

fetchAllPokemons();

//have to fix pokemons abilities